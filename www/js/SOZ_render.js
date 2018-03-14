//---------------------------------------------------------
//  SystemOZ for HTML5
//
//				レンダリングプログラム
//
//									  programed by R-TOHYA
//---------------------------------------------------------


//const	WINDOW_WIDTH = 640;
//const	WINDOW_HEIGHT = 1136;

const BLEND_NORMAL 		= 0;
const BLEND_ADD 		= 1;
const BLEND_SUB 		= 2;
const BLEND_MULTIPLE	= 3;
const BLEND_NEG			= 4;




//---------------------------------------------------------
//  キャンパス、コンテキスト関連の設定
//---------------------------------------------------------
let canvas = document.getElementsByTagName( 'canvas' )[ 0 ];  // キャンバス
let ctx = canvas.getContext( '2d' ); // コンテキスト


//---------------------------------------------------------
//  画像データ
//---------------------------------------------------------
let image = [ 1024 ];


//---------------------------------------------------------
//  その他変数
//---------------------------------------------------------
let game_type_render = 0;
let sort_id = [ TASK_MAX + 10 ];				//グラフィクソート用
let sort_data = [ TASK_MAX + 10 ];				//グラフィックソート用


//---------------------------------------------------------
//  テスト
//---------------------------------------------------------
let test_string ="12345678912345";









//--------------------------------------------------------------------------------------



//---------------------------------------------------------
//	画像のローディング
//---------------------------------------------------------

function SOZ_Texture_Load( slot, filename )
{
	image[ slot ] = new Image();
	image[ slot ].src = filename;
	image[ slot ].onload = function() { }	//画像が読み込まれるのを待ってから処理を続行
}




//---------------------------------------------------------
//  サーフェイスの解放
//---------------------------------------------------------
function SOZ_Texture_Release( surface )
{
	if( image[ surface ] != null )
	{
		image[ surface ] = null;
		delete image[ surface ];
	}
}





//---------------------------------------------------------
//  ブレンドセッティング
//---------------------------------------------------------


function SOZ_blend_setting( blend_mode )
{
	switch( blend_mode )
	{
		case BLEND_NORMAL:
			ctx.globalCompositeOperation = "source-over";
			break;

		case BLEND_ADD:
			ctx.globalCompositeOperation = "lighter";
			break;

		case BLEND_SUB:
			ctx.globalCompositeOperation = "darker";
			break;

		default:
			console_log( "おかしいよ" );
			break;
	}
}






//---------------------------------------------------------
//  バックグラウンドカラーの描画
//---------------------------------------------------------
function drawBackground( ) 
{
	ctx.fillStyle ="rgb(  0, 0, 0)"; 		//カラー設定
	ctx.fillRect( 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}


//---------------------------------------------------------
//  フォントの描画
//---------------------------------------------------------
function font_draw( ap ) 
{
	let r, b, g;
	let string1, string2;
	
	r = base_color_r[ ap ];
	g = base_color_g[ ap ];
	b = base_color_b[ ap ];
	
	ctx.globalAlpha = base_color_a[ ap ] / 255;
	ctx.shadowColor = "#000000";
	ctx.shadowBlur = 2;
	
	if( font_name[ ap ] == " " )
		string1 = "メイリオ ボールド"
	else
		string1 = "'" + font_name[ ap ] + "'";	


	ctx.font = font_size[ap] + "px " + string1;
	ctx.fillStyle ="rgb("+ r +"," + g + "," + b + ")"; 		//カラー設定
	ctx.textAlign = str_align[ ap ];
	ctx.fillText( str[ ap ], pos_x[ ap ] / WP, pos_y[ ap ] / WP );
	ctx.shadowBlur = 0;

}





//---------------------------------------------------------
//  スプライトデータの描画
//---------------------------------------------------------
function sprite_draw( ap ) 
{
	
	let	x, y, w, h, i, zx, zy;
	let	wkx, wky;
	let wx, wy, ww, wh, cx, cy; 

	i = anime_no[ ap ];
	wx = uv_rect[ ap ][ i ][ 0 ];
	wy = uv_rect[ ap ][ i ][ 1 ];
	ww = uv_rect[ ap ][ i ][ 2 ];
	wh = uv_rect[ ap ][ i ][ 3 ];
	cx = uv_rect[ ap ][ i ][ 4 ];
	cy = uv_rect[ ap ][ i ][ 5 ];

	if( tstFLG( grp_mode[ ap ], RECT_SMALL ) )				//バイリニアが強制でかかる場合用矩形、外側の謎メモリーから色を取得して変な中間色を作らないようにリミッターをかける
	{
		wx += 1;
		wy += 1;
		ww -= 2;
		wh -= 2;
		cx -= 1;
		cy -= 1;
	}  



	w = ww;
	h = wh;
	if( scale_x[ ap ] != WP || scale_y[ ap ] != WP )			//拡大率が等倍ではなかったばあい。
	{
		wkx = scale_x[ ap ] / WP;		//比率計算
		wky = scale_y[ ap ] / WP;
		w *= wkx;						//横幅の拡大
		h *= wky;						//縦幅の拡大
		cx *= wkx;						//中心位置の移動X
		cy *= wky;						//中心位置の移動Y
	}

	x = pos_x[ ap ] / WP - cx;
	y = pos_y[ ap ] / WP - cy;
	ctx.globalAlpha = base_color_a[ ap ] / 255;

	ctx.save();

	//回転機能の実現
	zx = pos_x[ ap ] / WP;
	zy = pos_y[ ap ] / WP;

	ctx.translate( 1 * zx,1 * zy); 				// キャンバスをトランスレーション
	ctx.rotate(  ang_z[ ap ] / 0x10000 * ( 3.14 * 2 ) );			// 回転をかける。
	ctx.translate(-1 * zx,-1 * zy);  			// キャンバスを元に戻す


	if( tstFLG( grp_mode[ ap ], FLIP_LR ) || tstFLG( grp_mode[ ap ], FLIP_UD ) )
	{
		if( tstFLG( grp_mode[ ap ], FLIP_LR ) )
	        ctx.transform( -1, 0, 0, 1, zx * 2, 0 );            //反転
	    if( tstFLG( grp_mode[ ap ], FLIP_UD ) )
	        ctx.transform( 1, 0, 0, -1, 0, zy * 2 );            //反転
	}

	ctx.drawImage(image[ tex_no[ ap ] ], wx, wy, ww, wh, x, y, w, h);

	//回転で壊れてしまったキャンバス状態の修復
	ctx.restore();
}



//---------------------------------------------------------
//  スプライトデータの描画
//---------------------------------------------------------
function SOZ_sprite_draw_param( px, py, anm_surf, anm_num, uv, scale, ang, alpha ) 
{
	let	x, y, w, h, i, zx, zy;
	let	wkx, wky;
	let wx, wy, ww, wh, cx, cy; 

	wx = uv[ anm_num ][ 0 ];
	wy = uv[ anm_num ][ 1 ];
	ww = uv[ anm_num ][ 2 ];
	wh = uv[ anm_num ][ 3 ];
	cx = uv[ anm_num ][ 4 ];
	cy = uv[ anm_num ][ 5 ];

	w = ww;
	h = wh;
	if( scale != WP )			//拡大率が等倍ではなかったばあい。
	{
		wkx = scale / WP;		//比率計算
		wky = scale / WP;
		w *= wkx;				//横幅の拡大
		h *= wky;				//縦幅の拡大
		cx *= wkx;				//中心位置の移動X
		cy *= wky;				//中心位置の移動Y
	}

	x = px / WP - cx;
	y = py / WP - cy;

	ctx.globalAlpha = alpha / 255;

	ctx.save();

	//回転機能の実現
	zx = px / WP;
	zy = py / WP;

	ctx.translate( 1 * zx,1 * zy); 					// キャンバスをトランスレーション
	ctx.rotate(  ang / 0x10000 * 6.28 );			// 回転をかける。
	ctx.translate(-1 * zx,-1 * zy);  				// キャンバスを元に戻す

	ctx.drawImage(image[ anm_surf ], wx, wy, ww, wh, x, y, w, h);

	//回転で壊れてしまったキャンバス状態の修復
	ctx.restore();
}









//------------------------------------------------------------
// ピポット算出
//------------------------------------------------------------
function med3( x, y, z)
{
    if (x < y)
        if (y < z) return y; else if (z < x) return x; else return z; else
        if (z < y) return y; else if (x < z) return x; else return z;
}



//------------------------------------------------------------
// クイックソート
// a     : ソートする配列
// left  : ソートするデータの開始位置
// right : ソートするデータの終了位置
//------------------------------------------------------------
function  quicksort( left, right)
{
    if (left < right) 
    {
		let i, j, tmp;

        i = left;
        j = right;
        pivot = med3( sort_data[ i ], sort_data[i + (j - i) / 2], sort_data[ j ]); /* (i+j)/2ではオーバーフローしてしまう */

        while(1) 
        {										/* a[] を pivot 以上と以下の集まりに分割する */
            while( sort_data[i] < pivot ) 
            	i++; 							/* a[i] >= pivot となる位置を検索 */

            while( pivot < sort_data[j] ) 
            	j--; 							/* a[j] <= pivot となる位置を検索 */

            if (i >= j) 
            	break;

            tmp = sort_data[ i ]; 
            sort_data[ i ] = sort_data[ j ]; 
            sort_data[ j ] = tmp; 						/* データを入れ替える */

            tmp = sort_id[ i ]; 
            sort_id[ i ] = sort_id[ j ]; 
            sort_id[ j ] = tmp; 						/* IDを入れ替える */

            i++; 
            j--;
        }

        quicksort( left, i - 1);  			/* 分割した左を再帰的にソート */
        quicksort( j + 1, right);				/* 分割した右を再帰的にソート */
    }
}








let stint = 0;


//---------------------------------------------------------
//  画像のレンダリング
//---------------------------------------------------------
function render() 
{
	let	id_index, sid, chk, old_p;


	drawBackground( );						//キャンバスを真っ白に塗る。
		
	//有効データを作り出す。
	id_index = 0;
	for(i = 0; i < TASK_MAX; i++ )
	{
		if( ( task_id[ i ] == TASK_GRP || task_id[ i ] == TASK_FONT ) && task_delay[ i ] == 0 )
		{
			sort_data[ id_index ] = pos_p[ i ];
			sort_id[ id_index ] = i;
			id_index++;
		}
	}

	//ゼロ個の場合の特殊処理
	if( id_index == 0 )
	{
		return;
	}
	
	//ソートを行なう。
	quicksort( 0, id_index - 1);

	chk = 0;
	old_p = -110000 * WP;;
	//タスクの描画
	for(i = 0; i < id_index; i++ )
	{
		sid = sort_id[ i ];
		if(  task_status[ sid ] != STATUS_HIDDEN && task_delay[ sid ] == 0 )
		{ 
			
			if( old_p >  pos_p[ sid ] )
			{
				sid = sid;
			}
			else
			{ 
				old_p =  pos_p[ sid ];
			}
			
			
			switch( task_id[ sid ] )
			{
				case TASK_GRP:
					SOZ_blend_setting( blend_type[ sid ] );							//	半透明の設定

					if( draw_func[ sid ] != -1 )
						draw_func[ sid ]( sid );
					else
						sprite_draw( sid );
						
					break;

				case TASK_FONT:
					font_draw( sid );
					break;
			}
		}
	}

	if( chk != 0 )
	{
		if( stint != 1 )
			stint = 2;
	}
	else
	{
		if( stint == 0 )
		{
			stint = 1;
		}
	}
}





setInterval( render, 33 );




