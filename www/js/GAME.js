//--------------------------------------------------------------------------------------
//
//    研修課題：歩数に伴ってキャラクターが進化する育成ゲーム
//
//    				    タイトルなし
//
//															Programed by TANAKA
//--------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------- 
//ゲームモード定義
//--------------------------------------------------------------------------------------
const GAMEMODE_INIT					= 0;
const GAMEMODE_SAVEDATA_LOAD        = 100;
const GAMEMODE_GAME					= 500;
const GAMEMODE_DEBUG                = 999;


//--------------------------------------------------------------------------------------
//使用するテクスチャ定義
//--------------------------------------------------------------------------------------
const TEXTURE_BG			= 1;
const TEXTURE_HEART         = 2;
const TEXTURE_NORMA         = 3;
const TEXTURE_HITCHECK		= 5;
const TEXTURE_FADE_BLACK	= 10;
const TEXTURE_FADE_WHITE	= 11;

const TEXTURE_TEST_BLUE     = 13;
const TEXTURE_STEP_FONT     = 14;

const TEXTURE_LINE			= 98;
const TEXTURE_PLANE			= 99;			//ちょっと荒いけど利用させてもらう
//100番移行は汎用メモリ
const TEXTURE_OPEN1			= 100;			//オープニング（汎用だけど最初に読み込む
const TEXTURE_OPEN2			= 101;
const TEXTURE_OPEN3			= 102;
const TEXTURE_OPENMES		= 103;






//--------------------------------------------------------------------------------------
//効果音
//--------------------------------------------------------------------------------------
const SE_DECIDE			= 0;			//決定



//--------------------------------------------------------------------------------------
//  定数定義のようなもの
//--------------------------------------------------------------------------------------
const HEART_SCALE   = ( WP / 10 ) * 3;



//--------------------------------------------------------------------------------------
//外部変数
//--------------------------------------------------------------------------------------
let interval;  											// ゲームを実行するタイマーを保持する変数

let hitrect_visible_flag = 0;

// 重力加速度のしきい値
const GRAVITY_MIN = 9.8;
const GRAVITY_MAX = 12.00;
// 歩数
let _step = 0;
let _step_backup = 0;
// 現在歩いているかどうか
let _isStep = false;

let how_many_day;

const term1_list = [ 0x011, 0x021 ];
const term2_list = 
[ 
    [ 0x0111, 0x0211, 0x0311, 0x0411 ],
    [ 0x0121, 0x0121, 0x0221, 0x0221 ]
];;

const term3_list = 
[
    [
        [ 0x1111, 0x1111 ],
        [ 0x1211, 0x1211 ],
        [ 0x1311, 0x1311 ],
        [ 0x1411, 0x1411 ],
    ],
    
    [
        [ 0x1121, 0x1121 ],
        [ 0x1221, 0x1221 ],
    ],
];



const length_of_stay =
[
    1, 2, 3, 4
];


const life_max_box =
[
    4, 6, 8, 10,
];




//--------------------------------------------------------------------------------------
//矩形データ
//--------------------------------------------------------------------------------------
const uv512_512_rect =
[
	[ 0 + 1, 0 + 1, 512 - 2, 512 - 2, ( 512 - 2 ) / 2, ( 512 - 2 ) / 2 ],
];

const hit_check_rect =
[
	[ 4, 4, 2, 2, 0, 0 ],
];

const test_red_rect =
[
    [ 0, 0, 640, 1136, 640 / 2, 1136 / 2 ],
];

const step_number_font_rect =
[
    [ 50 * 0 + 1, 50 * 0 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 1 + 1, 50 * 0 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 2 + 1, 50 * 0 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 3 + 1, 50 * 0 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 4 + 1, 50 * 0 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    
    [ 50 * 0 + 1, 50 * 1 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 1 + 1, 50 * 1 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 2 + 1, 50 * 1 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 3 + 1, 50 * 1 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
    [ 50 * 4 + 1, 50 * 1 + 1, 50 - 2, 50 - 2, ( 50 - 2 ) / 2, ( 50 - 2 ) / 2 ],
];

const bg_rect =
[
    [ 0, 0, 512, 758, 512 / 2, 758 / 2 ],
];

const life_rect =
[   
    [   0,   0, 128, 256, 128, 128 ],
    [ 128,   0, 128, 256,   0, 128 ]
];

const norma_rect =
[
    [ 0, 0, 256, 128, 256 / 2, 128 / 2 ],
];




//---------------------------------------------------------
//	ゲームで使用する多次元配列初期化
//（メモリ２重取りをしないように）
//---------------------------------------------------------
function GAME_memory_get_routine()
{
/*
	let i, x, y;
	for( i = 0; i < time_recode.length; i++) 
		time_recode[ i ] = new Array( 64 );
	
	for( y = 0; y < time_recode.length; y++) 
	{
		for( x = 0; x < time_recode[ y ].length; x++) 
		{
			time_recode[ y ][ x ] = 5999.999;
		}
	}	
	
	for( x = 0; x < time_recode[ 0 ].length; x++) 
	{
		time_recode[ x ][ 62 ] = 0;
	}
*/
}







//---------------------------------------------------------
//	ゲームに必要なグラフィックのロードを行う。
//---------------------------------------------------------
function GAME_system_grp_load( )
{
	FADE_grp_load();
	
	SOZ_Texture_Load( TEXTURE_BG            , "grp/bg.png" );
    SOZ_Texture_Load( TEXTURE_HITCHECK		, "grp/hit_check.png" );
    SOZ_Texture_Load( TEXTURE_HEART         , "grp/heart.png" );
    SOZ_Texture_Load( TEXTURE_NORMA         , "grp/norma.png" ); 

    SOZ_Texture_Load( TEXTURE_TEST_BLUE     , "grp/test2.png" );
    SOZ_Texture_Load( TEXTURE_STEP_FONT     , "grp/font.png" );
}





//---------------------------------------------------------
//    ノルマを表示
//---------------------------------------------------------
function GAME_norma_exec( ap )
{
}
function GAME_norma2_exec( ap )
{
    if( work1[ ap ] == 0 ) 
        anime_no[ ap ] = norma_step_number % 10;
    else
        anime_no[ ap ] = Math.floor( norma_step_number / ( 10 ** work1[ ap ] ) ) % 10; 
}
function GAME_norma_start()
{
    let ap,i;
    
    ap = TASK_start_GRP( GAME_norma_exec, 0, TEXTURE_NORMA, norma_rect, 0, "ノルマ" );
    pos_x[ ap ] = ( WINDOW_WIDTH  / 100 ) * 25 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT / 10 ) * 8 * WP;
    pos_p[ ap ] = 310 * WP;
    scale_x[ ap ] = ( WP / 10 ) * 6;
    scale_y[ ap ] = scale_x[ ap ];

    for( i = 0; i < 5; i++ )
    {
        ap = TASK_start_GRP( GAME_norma2_exec, 0, TEXTURE_STEP_FONT, step_number_font_rect, 0, "歩数を表示する" );
        pos_x[ ap ] = ( WINDOW_WIDTH  / 100 ) * 25 * WP + 30 * ( i + 4 ) * WP;
        pos_x[ ap ] = ( WINDOW_WIDTH - 30 * ( i + 1 ) ) * WP;
        pos_y[ ap ] = ( WINDOW_HEIGHT / 10 ) * 8 * WP;
        pos_p[ ap ] = 1000 * WP;
        work1[ ap ] = i;
        anime_no[ ap ] = 0;
        scale_x[ ap ] = ( WP / 10 ) * 7;
        scale_y[ ap ] = scale_x[ ap ];
    }
}





//---------------------------------------------------------
//    ライフを表示
//---------------------------------------------------------
function GAME_life_exec( ap )
{
    
}
function GAME_life_start()
{
    let ap;
    let i;
    
    for( i = 0; i < life_value; i += 2 )
    {
        ap = TASK_start_GRP( GAME_life_exec, 0, TEXTURE_HEART, life_rect, 0, "ライフ" );
        pos_x[ ap ] = ( WINDOW_WIDTH / 10 ) * ( i + 1 ) * WP;
        pos_y[ ap ] = ( WINDOW_HEIGHT / 10 ) * 9 * WP;
        pos_p[ ap ] = 300 * WP;
        scale_x[ ap ] = HEART_SCALE;
        scale_y[ ap ] = HEART_SCALE;
        
        if( i + 1 < life_value )
        {
            ap = TASK_start_GRP( GAME_life_exec, 0, TEXTURE_HEART, life_rect, 1, "ライフ" );
            pos_x[ ap ] = ( WINDOW_WIDTH / 10 ) * ( i + 1 ) * WP;
            pos_y[ ap ] = ( WINDOW_HEIGHT / 10 ) * 9 * WP;
            pos_p[ ap ] = 300 * WP;
            scale_x[ ap ] = HEART_SCALE;
            scale_y[ ap ] = HEART_SCALE;
        }
    }
}




//---------------------------------------------------------
//  キャラクターを表示
//---------------------------------------------------------
function GAME_character_exec( ap )
{
    scale_x[ ap ] = work5[ ap ] + SOZ_get_SIN( ang_x[ ap ] ) * work3[ ap ];
    scale_y[ ap ] = work5[ ap ] + SOZ_get_COS( ang_x[ ap ] ) * work3[ ap ];
    ang_x[ ap ] += 0x800;
    
    switch( work2[ ap ] )
    {
		case 0:
			if( Rand2( 0, 100 ) == 0 )
				work2[ ap ] = 1;		//モーションさせる
			break;

		case 1:
			work3[ ap ] += WP / 200;
			if( work3[ ap ] >= WP / 6 )
				work2[ ap ] =2;
			break;

		case 2:
			work3[ ap ] -= WP / 200;
			if( work3[ ap ] <= 0 * WP )
			{
				work3[ ap ] = 0;
				work2[ ap ] = 0;
			}
			break;
	}
    
    switch( work6[ ap ] )   // 移動管理用
    {
        case 0:
            vec_x[ ap ] = Rand2( - 1, 2 ) * WP;
            work7[ ap ] = Rand2( 60, 60 * 3 );
            work6[ ap ]++;
            break;
        
        case 1:
            work7[ ap ]--;
            pos_x[ ap ] += vec_x[ ap ];
            
            if( work7[ ap ] <= 0 ) 
                work6[ ap ]--;
                
            if( pos_x[ ap ] <= 0 )
            {
                vec_x[ ap ] = WP;    
                work7[ ap ] = Rand2( 60, 60 * 3 );
            }    
                
            if( WINDOW_WIDTH * WP <= pos_x[ ap ] )
            {
                vec_x[ ap ] = - WP;
                work7[ ap ] = Rand2( 60, 60 * 3 );
            }    
            break;
    }
}
function GAME_character_start()
{
    let i;
    let ap;
    let tex = 150 + step_number_table[ how_many_day ][ 1 ];
    let gn = "grp/";
    gn += step_number_table[ how_many_day ][ 1 ].toString(16);
    gn += ".png";
    
    SOZ_Texture_Load( tex, gn );
    
    ap = TASK_start_GRP( GAME_character_exec, 0, tex, uv512_512_rect, 0, "キャラクター本体" );
    
    pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
    pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
    pos_p[ ap ] = 200 * WP;
    scale_x[ ap ] = WP / 2;
    scale_y[ ap ] = scale_x[ ap ];
    work5[ ap ] = WP / 2;
    work6[ ap ] = 0;
}





//---------------------------------------------------------
// 背景
//---------------------------------------------------------
function GAME_bg_exec( ap )
{
    
}
function GAME_bg_start()
{
    let ap;
    ap = TASK_start_GRP( GAME_bg_exec, 0, TEXTURE_BG, bg_rect, 0, "背景" );
    pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
    pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
    pos_p[ ap ] = 100 * WP;
}




//---------------------------------------------------------
// デバッグモード時には青いグラフィックを
//---------------------------------------------------------
function GAME_test_blue_square_exec( ap )
{
  
}
function GAME_test_blue_square_start()
{
    let ap;
    ap = TASK_start_GRP( GAME_test_blue_square_exec, 120, TEXTURE_TEST_BLUE, test_red_rect, 0, "青いいグラフィックを" );
    pos_x[ ap ] = ( WINDOW_WIDTH / 2 ) * WP;
	pos_y[ ap ] = ( WINDOW_HEIGHT / 2 ) * WP;
	pos_p[ ap ] = 300 * WP;
    base_color_a[ ap ] = 255 / 2;
}





//---------------------------------------------------------
// デバッグモードへ移動させる
//---------------------------------------------------------
function GAME_jump_debug_mode_exec( ap )
{
    work3[ ap ]--;
    if( 1 == mouse_click && work5[ ap ] == 0 )  // タッチされた！
    {    
        work3[ ap ] = work2[ ap ];
        work5[ ap ] = 1;                        // 長押しで連打判定を取らないように
        work1[ ap ]++;
    }
    
    if( mouse_click == -1 )
        work5[ ap ] = 0;
    
    if( work3[ ap ] < 0 )                       // 一定時間経過したら連打判定にはならない
        work1[ ap ] = 0;
        
    if( work4[ ap ] <= work1[ ap ] )            // 指定した回数連打されたら
    {    
        GAME_test_blue_square_start();
        game_type = GAMEMODE_DEBUG;
        TASK_end( ap );
        return;
    }
}
function GAME_jump_debug_mode()
{
    let ap;
    ap = TASK_start( GAME_jump_debug_mode_exec, 0, "デバッグモードへ移動させる" );
    task_id[ ap ] = TASK_PROGRAM;
    work1[ ap ] = 0;                // タッチ数をカウントする
    work2[ ap ] = 10;               // 連打判定に用いる
    work3[ ap ] = 0;                // タッチされてから次にタッチされるまでの時間をカウントする
    work4[ ap ] = 5;                // 何度連打されたらデバッグモードへ移動させるか
    work5[ ap ] = 0;                // 一度指が離されたかどうか判断する
}







//---------------------------------------------------------
// 通常モードに移動させる
//---------------------------------------------------------
function GAME_jump_game_mode_exec( ap )
{
    work3[ ap ]--;
    if( 1 == mouse_click && work5[ ap ] == 0 )  // タッチされた！
    {    
        work3[ ap ] = work2[ ap ];
        work5[ ap ] = 1;                        // 長押しで連打判定を取らないように
        work1[ ap ]++;
    }
    
    if( mouse_click == -1 )
        work5[ ap ] = 0;
    
    if( work3[ ap ] < 0 )                       // 一定時間経過したら連打判定にはならない
        work1[ ap ] = 0;
        
    if( work4[ ap ] <= work1[ ap ] )            // 指定した回数連打されたら
    {    
        game_type = GAMEMODE_GAME + 1;
        TASK_end_group( 120 );                  // デバッグ情報を全削除
        TASK_end( ap );
        return;
    }
}
function GAME_jump_game_mode()
{
    let ap;
    ap = TASK_start( GAME_jump_game_mode_exec, 0, "デバッグモードへ移動させる" );
    task_id[ ap ] = TASK_PROGRAM;
    work1[ ap ] = 0;                // タッチ数をカウントする
    work2[ ap ] = 10;               // 連打判定に用いる
    work3[ ap ] = 0;                // タッチされてから次にタッチされるまでの時間をカウントする
    work4[ ap ] = 5;                // 何度連打されたらデバッグモードへ移動させるか
    work5[ ap ] = 0;                // 一度指が離されたかどうか判断する
}








//---------------------------------------------------------
//  タッチしている座標に四角を表示する
//---------------------------------------------------------
function GAME_test_touch_pos_exec( ap )
{
    pos_x[ ap ] = mouse_x * WP;
    pos_y[ ap ] = mouse_y * WP;
}
function GAME_test_touch_pos_start()
{
    let ap;
    ap = TASK_start_GRP( GAME_test_touch_pos_exec, 0, TEXTURE_FADE_WHITE, fade_parts, 0, "タッチしている座標" );
    pos_x[ ap ] = mouse_x * WP;
	pos_y[ ap ] = mouse_y * WP;
    scale_x[ ap ] = 10 * WP;
	scale_y[ ap ] = 10 * WP;
    pos_p[ ap ] = 100000 * WP;
}





//--------------------------------------------------------------------------------------
//    歩数を表示する
//--------------------------------------------------------------------------------------
function GAME_step_number_exec( ap )
{
    if( work1[ ap ] == 0 ) 
        anime_no[ ap ] = step_number_table[ how_many_day ][ 0 ] % 10;
    else
        anime_no[ ap ] = Math.floor( step_number_table[ how_many_day ][ 0 ] / ( 10 ** work1[ ap ] ) ) % 10; 
}
function GAME_step_number_start()
{
    let ap;
    let i;  // ループ用カウンタ
    
    for( i = 0; i < 5; i++ )
    {
        ap = TASK_start_GRP( GAME_step_number_exec, 0, TEXTURE_STEP_FONT, step_number_font_rect, 0, "歩数を表示する" );
        pos_x[ ap ] = ( WINDOW_WIDTH - 50 * ( i + 1 ) - 30 ) * WP;
        pos_y[ ap ] = WINDOW_HEIGHT / 4 * WP;
        pos_p[ ap ] = 1000 * WP;
        work1[ ap ] = i;
        anime_no[ ap ] = 0;
    }
}



//--------------------------------------------------------------------------------------
//    歩数を増やしたり減らしたりする
//--------------------------------------------------------------------------------------
function GAME_step_number_controler_exec( ap )
{
    if( 1 == mouse_click )                      // タッチされていたら
        work3[ ap ]++;
    else    
    {   
       work2[ ap ] = 0;                         // 遷移を戻す
       work3[ ap ] = 0;                         // 長押しされたフレーム数のカウンターをリセット
       work4[ ap ] = 0;
    }
    
    switch( work2[ ap ] )
    {
        case 0:
            if( work1[ ap ] <= work3[ ap ] )    // 指定した時間数以上経過していたら
                work2[ ap ]++;                  // 次の遷移へ
            break;
            
        case 1:
            if( WINDOW_WIDTH / 2 < mouse_x )    // タッチされているのが半分よりも右側であった場合
            {    
                work5[ ap ] = 0;
                work4[ ap ]++;
                _step += work4[ ap ];
            }
                
            if( WINDOW_WIDTH / 2 > mouse_x )    // タッチされているのが半分よりも左側であった場合
            {    
                work4[ ap ] = 0;
                work5[ ap ]++;
                _step -= work5[ ap ];
            }
            
            if( _step < 0 )                     // ０よりも小さい値にはさせない
                _step = 0;
            break;
    }
}
function GAME_step_number_controler_start()
{
    let ap;
    ap = TASK_start( GAME_step_number_controler_exec, 120, "歩数を増やしたり減らしたりする" );
    task_id[ ap ] = TASK_PROGRAM;
    work1[ ap ] = 60;   // 何秒以上押したら歩数を制御できるか
    work2[ ap ] = 0;    // タスクの遷移状態
    work3[ ap ] = 0;    // 長押しされている間のフレーム数をカウントする
    work4[ ap ] = 0;    // 少しずつ増えていくペースが速くなっていく
    work5[ ap ] = 0;    // 少しずつ減っていくペースが速くなっていく
}




//--------------------------------------------------------------------------------------
//    現在の時刻を表示
//--------------------------------------------------------------------------------------
function GAME_time_output_exec( ap )
{
    let dt = new Date();
    str[ ap ] = String( dt );
}
function GAME_time_output_start()
{
    let ap;
    let dt = new Date();
    ap = TASK_start_FONT( GAME_time_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 10 ) * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = String( dt );
} 




//--------------------------------------------------------------------------------------
//    ゲームを最後に起動した時間を表示
//--------------------------------------------------------------------------------------
function GAME_last_boot_time_output_exec( ap )
{
    str[ ap ] = String( new Date( last_boot_time ) );
}
function GAME_last_boot_time_output_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_last_boot_time_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 25 - 0 ) * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = String( last_boot_time );
}





//--------------------------------------------------------------------------------------
//    ゲームを開始した時刻を表示
//--------------------------------------------------------------------------------------
function GAME_recent_boot_time_output_exec( ap )
{
    str[ ap ] = String( new Date( recent_boot_time ) );
}
function GAME_recent_boot_time_output_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_recent_boot_time_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 25 - 15 ) * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = String( recent_boot_time );
}



//--------------------------------------------------------------------------------------
//    今までの歩数が表示される
//--------------------------------------------------------------------------------------
function GAME_all_step_number_output_exec( ap )
{
    
}
function GAME_all_step_number_output_start()
{
    let ap;
    let i;
    let j;
    
    for( j = 0; j < 12; j ++ )
    {
        ap = TASK_start_FONT( GAME_all_step_number_output_exec, 120, "", 0, 10 );
        pos_x[ ap ] = 10 * WP;
        pos_y[ ap ] = 10 * WP + 15 * j * WP;
        pos_p[ ap ] = 100000 * WP;
        work1[ ap ] = j * 10;
        
        for( i = 0; i < 10; i++ )
        {
            str[ ap ] += String( step_number_table[ i + work1[ ap ] ][ 0 ] );
            str[ ap ] += "[";
            str[ ap ] += String( Number( step_number_table[ i + work1[ ap ] ][ 1 ] ).toString( 16 ) ); 
            str[ ap ] += "]";
            str[ ap ] += " ";
        }
    }
}




//--------------------------------------------------------------------------------------
//    データの削除
//--------------------------------------------------------------------------------------
function GAME_data_clear_controler_exec( ap )
{
    switch( work10[ ap ] )
    {
        case 0:
            work3[ ap ]--;
            if( 1 == mouse_click && work5[ ap ] == 0 )  // タッチされた！
            {    
                work3[ ap ] = work2[ ap ];
                work5[ ap ] = 1;                        // 長押しで連打判定を取らないように
                work1[ ap ]++;
            }
            
            if( mouse_click == -1 )
                work5[ ap ] = 0;
            
            if( work3[ ap ] < 0 )                       // 一定時間経過したら連打判定にはならない
                work1[ ap ] = 0;
    
            if( work4[ ap ] <= work1[ ap ] )
            {    
                task_id[ ap ] = TASK_FONT;
                work10[ ap ]++;                         // 次の遷移へ
            }
            break;
            
        case 1:
            if( 1 == mouse_click )
                work7[ ap ]++;
            else
            {
                work12[ ap ]++;
                if( work11[ ap ] <= work12[ ap ] )      // 一定時間無操作状態が続いた
                    work10[ ap ] = 10;                  // メンバの初期化処理に遷移
                
                if( work7[ ap ] != 0 )                  // 長押しせずに指が離された
                    work10[ ap ] = 10;                  // メンバの初期化に遷移
            }
            
            if( work6[ ap ] <= work7[ ap ] )            // 長押しされた
            {
                SAVEDATA_gameclear();
                str[ ap ] = "data erasing......";
                task_id[ ap ] = TASK_FONT;
                work10[ ap ]++;
            }
            break;
            
        case 2:
            work8[ ap ]++;
            if( work9[ ap ] <= work8[ ap ] )        // 指定したフレーム数経過したら
                work10[ ap ] = 10;                  // メンバの初期化ルーチンへ
            break;
            
        case 10:
            str[ ap ] = "preparation in data erasing progress";
            
            // case 0 で利用するメンバの初期化
            work1[ ap ] = 0;                // タッチ数をカウントする
            work3[ ap ] = 0;                // タッチされてから次にタッチされるまでの時間をカウントする
            work5[ ap ] = 0;                // 一度指が離されたかどうか判断する
            
            // case 1 で利用するメンバの初期化
            work7[ ap ] = 0;                // 長押しされたフレーム数をカウント  
            work12[ ap ] = 0;               // タッチされていないフレーム数カウンター
            
            // case 2 で利用するメンバの初期化
            work8[ ap ] = 0;    
        
            work10[ ap ] = 0;               // 遷移を初めに戻す
            task_id[ ap ] = TASK_PROGRAM;   // 不可視にする
            break;
    }
}
function GAME_data_clear_controler_start()
{
    let ap;
    ap = TASK_start( GAME_data_clear_controler_exec, 120, "データの削除"  );
    task_id[ ap ] = TASK_PROGRAM;
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = "preparation in data erasing progress";
    
    // case 0 で利用するメンバ
    work1[ ap ] = 0;                // タッチ数をカウントする
    work2[ ap ] = 10;               // 連打判定に用いる
    work3[ ap ] = 0;                // タッチされてから次にタッチされるまでの時間をカウントする
    work4[ ap ] = 3;                // 何度連打されたらデバッグモードへ移動させるか
    work5[ ap ] = 0;                // 一度指が離されたかどうか判断する
    
    // case 1 で利用するメンバ
    work6[ ap ] = 30;               // 遷移後何フレーム押せばデータが削除されるか
    work7[ ap ] = 0;                // 長押しされたフレーム数をカウント
    work11[ ap ] = 60;              // ここで指定されたフレーム分経過したら自動的に初期化処理へ飛ばさせる
    work12[ ap ] = 0;               // タッチされていないフレーム数カウンター
    
    // case 2 で使用するメンバ
    work8[ ap ] = 0;                // 文字を表示しているフレーム数カウンター
    work9[ ap ] = 30;               // 文字を表示するフレーム数
    
    work10[ ap ] = 0;               // タスクの遷移状態 
} 




//--------------------------------------------------------------------------------------
//    ノルマを表示する
//--------------------------------------------------------------------------------------
function GAME_norma_output_exec( ap )
{
    str[ ap ] = String( norma_step_number );
}
function GAME_norma_output_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_norma_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 25 - 30 ) * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = String( norma_step_number );
}





//--------------------------------------------------------------------------------------
//    ライフを表示する
//--------------------------------------------------------------------------------------
function GAME_life_output_exec( ap )
{
    str[ ap ] = String( life_value );
    str[ ap ] += "/";
    str[ ap ] += String( life_max_box[ term_discriminator( step_number_table[ how_many_day ][ 1 ] ) ] );
}
function GAME_life_output_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_life_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 25 - 45 ) * WP;
    pos_p[ ap ] = 100000 * WP;
}






//--------------------------------------------------------------------------------------
//    何期であるか
//--------------------------------------------------------------------------------------
function GAME_term_output_exec( ap )
{
    str[ ap ] = String( term_discriminator( step_number_table[ how_many_day ][ 1 ] ) );
}
function GAME_term_output_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_term_output_exec, 120, "", 0, 10 );
    pos_x[ ap ] = 10 * WP;
    pos_y[ ap ] = ( WINDOW_HEIGHT - 25 - 60 ) * WP;
    pos_p[ ap ] = 100000 * WP;
    str[ ap ] = String( term_discriminator( step_number_table[ how_many_day ][ 1 ] ) );
}

















//--------------------------------------------------------------------------------------
//    歩数の保存処理
//--------------------------------------------------------------------------------------
function GAME_step_number_save()
{
    if( _step != _step_backup ) // 歩数が変わったらデータを保存する
    {
        step_number_table[ how_many_day ][ 0 ] = _step; 
        last_boot_time = new Date();
        SAVEDATA_gamesave();
        _step_backup = _step;
    }
}





//--------------------------------------------------------------------------------------
//    日付の差分日数を返却する
//--------------------------------------------------------------------------------------
function getDiff(date1Str, date2Str) 
{
    var date1 = new Date(date1Str);
    var date2 = new Date(date2Str);
 
	// getTimeメソッドで経過ミリ秒を取得し、２つの日付の差を求める
    var msDiff = date2.getTime() - date1.getTime();
 
	// 求めた差分（ミリ秒）を日付へ変換します（経過ミリ秒÷(1000ミリ秒×60秒×60分×24時間)。端数切り捨て）
	var daysDiff = Math.floor(msDiff / (1000 * 60 * 60 *24));
 
    return daysDiff;
}




//--------------------------------------------------------------------------------------
//    日付が変わったら遷移させる
//--------------------------------------------------------------------------------------
function GAME_init_check()
{
    let d = getDiff( new Date( recent_boot_time ), new Date() );
    let c = 0;
    let i = 1;                                                                  // ループ用変数
    
    if( step_number_table[ d ][ 1 ] == -1 )                                 // まだ進化してない
    {    
        console.log( "日付が変わったら遷移させる" );
        console.log( "d = " + d );
        console.log( step_number_table[ d ][ 1 ] );
        
        while( step_number_table[ d - i ][ 1 ] == - 1 )
        {
            console.log( step_number_table[ d - i ][ 1 ] );
            i++;
            c++;   
        }
        
        console.log( "c = " + c );
        
        for( i = c; 0 < i; i-- )
        {    
            revolution_call_check( d - i );
        }
        
        game_type = GAMEMODE_SAVEDATA_LOAD;  
    }   
}








//---------------------------------------------------------
//  何期なのか判別する関数  
//---------------------------------------------------------
function term_discriminator( id )
{
    let t = 3;  // 2期
    let mask = 0xf000;
    
    if( ( mask & id ) == 0 )
        t = 2;  // 1期
    else
        return t;

    mask = mask >> 4;
    
    if( ( mask & id ) == 0 )
        t = 1;  // 1期
    else
        return t;
    
    mask = mask >> 4;
    
    if( ( mask & id ) == 0 )
    {    
        t = 0;  // 0期
        return t;
    }
    else
        return t;
}




//---------------------------------------------------------
//  キャラクターのID（期間内での）を返す  
//---------------------------------------------------------
function get_character_id_in_term( id, term )
{
    let mask = 0xf;
    mask = mask << ( 4 * term );
    id &= mask;
    id = ( id >> ( 4 * term ) ) - 1;
    return id; 
}








//--------------------------------------------------------------------------------------
//    その時期になって何日目であるかカウントし、返す
//--------------------------------------------------------------------------------------
function how_many_day_in_term( day )
{
    let i, ba;
    let cnt = 1;

    ba = term_discriminator( step_number_table[ day - 1 ][ 1 ] );
    
    for( i = 1; 0 <= day - 1 - i; i++ )
    {
        if( term_discriminator( step_number_table[ day - 1 - i ][ 1 ] ) == ba )
            cnt++;
        else
            break;
    }    
    
    console.log( "cnt = " + cnt );
    return cnt;
}







//--------------------------------------------------------------------------------------
//    進化の分岐
//--------------------------------------------------------------------------------------
function revolution_branch( t, day )
{
    let pID = new Array( 2 ); 
	pID[ 0 ] = get_character_id_in_term( step_number_table[ day - 1 ][ 1 ], t ); 
    pID[ 1 ] = get_character_id_in_term( step_number_table[ day - 1 ][ 1 ], t - 1 );
    console.log( step_number_table[ day - 1 ][ 1 ] );
 	console.log( "pID[ 0 ]" + get_character_id_in_term( step_number_table[ day - 1 ][ 1 ], t - 1 ) );
    console.log( "pID[ 1 ]" + get_character_id_in_term( step_number_table[ day - 1 ][ 1 ], t - 2 ) );
     
    switch( t )
    {
        case 0:
            if( life_max_box[ t ] * 8 / 10 <= life_value )    
                step_number_table[ day ][ 1 ] = term1_list[ 0 ];                           // 強制的に進化させる
            else
                step_number_table[ day ][ 1 ] = term1_list[ 1 ];                           // 強制的に進化させる
            break;
            
        case 1:
            if( life_max_box[ t ] * 8 / 10 <= life_value )    
                step_number_table[ day ][ 1 ] = term2_list[ pID[ 0 ] ][ 0 ];                           // 強制的に進化させる
            else
                step_number_table[ day ][ 1 ] = term2_list[ pID[ 0 ] ][ 1 ];                           // 強制的に進化させる
            break;
            
		case 2:
			if( life_max_box[ t ] * 8 / 10 <= life_value )    
                step_number_table[ day ][ 1 ] = term3_list[ pID[ 1 ] ][ pID[ 0 ] ][ 0 ];                           // 強制的に進化させる
            else
                step_number_table[ day ][ 1 ] = term3_list[ pID[ 1 ] ][ pID[ 0 ] ][ 1 ];                           // 強制的に進化させる
			break;
			
        case 3:
            SAVEDATA_gameclear();
            game_type = GAMEMODE_SAVEDATA_LOAD;
            break;
    }
}






//--------------------------------------------------------------------------------------
//    進化チェック関数
//--------------------------------------------------------------------------------------
function revolution_check( day )
{
    let t = term_discriminator( step_number_table[ day - 1 ][ 1 ] );
    
    console.log( "-----day = " + day );
    console.log( "-----t = " + t );
    //console.log( length_of_stay[ t ] );
    //console.log( how_many_day_in_term( day ) );
    if( length_of_stay[ t ] <= how_many_day_in_term( day ) )
    {    
        console.log( ">>進化" );
        revolution_branch( t, day );
    }
    else
        step_number_table[ day ][ 1 ] = step_number_table[ day - 1 ][ 1 ];    // 進化させない
}




//--------------------------------------------------------------------------------------
//    ライフ値の管理用
//--------------------------------------------------------------------------------------
function life_control( day )
{
    if( norma_step_number <= step_number_table[ day - 1 ][ 0 ] )       // ノルマを達成できた場合はライフをインクリメント
        life_value++;
    else
        life_value--;
    
    if( life_value < 0 )                                                        // 0より小さくなった場合                         
        life_value = 0;                                                         // 0に 
}




//--------------------------------------------------------------------------------------
//    ライフ値が最大値を上回ってしまっていた場合は丸める
//--------------------------------------------------------------------------------------
function life_round_process( day )
{
    if( life_max_box[ term_discriminator( step_number_table[ day ][ 1 ] ) ] < life_value )
        life_value = life_max_box[ term_discriminator( step_number_table[ day ][ 1 ] ) ];
}




//--------------------------------------------------------------------------------------
//    進化チェック関数を呼び出すべきかどうか判断する
//--------------------------------------------------------------------------------------
function revolution_call_check( day )
{    
    if( step_number_table[ day ][ 1 ] == -1 )   // まだ進化してない
    {    
        if( day == 0 )                                                         // 初日であった場合
            step_number_table[ day ][ 1 ] = 0x001;                             // 強制的に初期キャラのIDを代入
        else
        {
            life_control( day );                                                             // ライフの増減チェック
            revolution_check( day );                                                         // 進化チェック
            life_round_process( day );                                                       // ライフ丸め処理
        }
    }
    
    SAVEDATA_gamesave();
}









//--------------------------------------------------------------------------------------
//    変数の初期化
//--------------------------------------------------------------------------------------
function GAME_variable_init()
{
    for( i = 0; i < 120; i++ )
    {    
        step_number_table[ i ] = new Array( 2 );    // 
        step_number_table[ i ][ 0 ] = 0;
        step_number_table[ i ][ 1 ] = - 1;
    }
    game_data_table[ 0 ] = 999;                     // とりあえず適当な値を入れておく
    recent_boot_time = new Date();                  // 初期値　初回でなければ下のロード関連で上書きされる
    last_boot_time = new Date();
    life_value = 4;
    norma_step_number = 1000;                       // ノルマ（とりあえず1000）
}




//--------------------------------------------------------------------------------------
//    キャラクターの画像の解放
//--------------------------------------------------------------------------------------
function GAME_character_Texture_Release()
{
    let i;
    
    for( i = 0x0000; i <= 0xffff; i++ )
        SOZ_Texture_Release( 150 + i );
}





//--------------------------------------------------------------------------------------
//	当たり判定可視化
//--------------------------------------------------------------------------------------
function Visualize_CollisionDetection_Exec( ap )
{
	work2[ ap ]--;
	if( hit_x[ work1[ ap ] ] != -999 || hit_y[ work1[ ap ] ] != -999 || hit_w[ work1[ ap ] ] != -999 || hit_h[ work1[ ap ] ] != -999 )
	{	
		task_id[ ap ] = TASK_GRP;
		base_color_a[ ap ] = 100;
		pos_x[ ap ] = pos_x[ work1[ ap ] ] + hit_x[ work1[ ap ] ] * WP; 
		pos_y[ ap ] = pos_y[ work1[ ap ] ] + hit_y[ work1[ ap ] ] * WP;
		scale_x[ ap ] = ( hit_w[ work1[ ap ] ] / 2 ) * WP;
		scale_y[ ap ] = ( hit_h[ work1[ ap ] ] / 2 ) * WP;
	}
	else
		task_id[ ap ] = TASK_PROGRAM;
	
	if( task_id[ work1[ ap ] ] == TASK_SLEEP || work2[ ap ] <= 0 )	// タスクが終了していたら
	{
		TASK_end( ap );							// 子供も殺す
		return;
	}
}
function Visualize_CollisionDetection_Start( actp )
{
	let ap;
	ap = TASK_start( Visualize_CollisionDetection_Exec, 0, "当たり判定の可視化" );
	pos_x[ ap ] = pos_x[ actp ];
	pos_y[ ap ] = pos_y[ actp ];
	pos_p[ ap ] = 100000 * WP;
	work1[ ap ] = actp;	// 当たり判定をつけるタスクの ap
	work2[ ap ] = 2;
	tex_no[ ap ] = TEXTURE_HITCHECK;
	uv_rect[ ap ] = hit_check_rect;
	anime_no[ ap ] = 0;
}
//--------------------------------------------------------------------------------------
//	当たり判定可視化
//--------------------------------------------------------------------------------------
function Visualize_CollisionDetection()
{
	let i;
	
	for( i = 0; i < TASK_MAX; i++ )
	{
		if( task_id[ i ] != TASK_SLEEP )
		{
			if( hit_x[ i ] != - 999 || hit_y[ i ] != - 999 || hit_w[ i ] != - 999 || hit_h[ i ] != - 999 )	
				Visualize_CollisionDetection_Start( i );
		}
	}
}






//---------------------------------------------------------
//	ゲームのメインルーチン
//---------------------------------------------------------
let gt_counter = 0;
let gt_loop;

let debug_counter = 0;



function GAME_main_routine() 
{
    let i, j;      // ループ用カウンタ
    SE_exec();
    
	// SHIFT を押しながら H で当たり判定の表示切替
	if( SOZ_Inkey_DAT( DIK_LSHIFT ) != 0 && SOZ_Inkey_TRG( DIK_H ) != 0 )
		hitrect_visible_flag++;
	
	if( hitrect_visible_flag % 2 != 0 )
		Visualize_CollisionDetection();

	switch( game_type )
	{
		//ゲーム初期化
		case GAMEMODE_INIT:
		    ctx.font = "16px 'メイリオ ボールド'";

            GAME_variable_init();                       // 変数の初期化
            SE_load();									//効果音の読み込み
			GAME_system_grp_load();						//一番最初にロードすべきもの	
            
            game_type = GAMEMODE_SAVEDATA_LOAD;
    		
            
            break;
    
        case GAMEMODE_SAVEDATA_LOAD:
            TASK_all_init( );    						                        //タスクの全消去
            GAME_character_Texture_Release();                                   // キャラクターの画像はすべて解放
            
            SAVEDATA_gameload_1st();    				//一番最初のセーブデータ読み込み
            
            how_many_day = getDiff( new Date( recent_boot_time ), new Date() ); // 最後に起動してから経過した日数を求める
            revolution_call_check( how_many_day );                                            // 進化判定関数を呼び出すかどうか
            
            //後々関数化
            last_boot_time = new Date();
            _step = step_number_table[ how_many_day ][ 0 ];
            _step_backup = _step;
            
            game_type = GAMEMODE_GAME;
            break;

		//ゲーム本体
		case GAMEMODE_GAME:											//ゲームに行く前の準備
            GAME_step_number_start();
            PLAYER_character_start();
            GAME_life_start();
            GAME_norma_start();
            GAME_bg_start();
            game_type++;
			break;

		case GAMEMODE_GAME + 1:											//ゲームに行く前の準備
			GAME_jump_debug_mode();
            game_type++;
            break;
            
        // デバッグモード
        case GAMEMODE_DEBUG:
            GAME_step_number_controler_start();                         // 歩数を制御
            GAME_time_output_start();                                   // 現在の時刻を表示
            GAME_recent_boot_time_output_start();                       // 最後に起動した時刻を表示
            GAME_last_boot_time_output_start();
            GAME_data_clear_controler_start();                          // データ消去制御
            GAME_all_step_number_output_start();                        // 過去の歩数を表示
            GAME_norma_output_start();                                  // ノルマを表示
            GAME_life_output_start();                                   // ライフを表示
            GAME_term_output_start();                                   // 何期であるかを表示
            
            GAME_jump_game_mode();
            game_type++;
            break;
	}

    GAME_step_number_save();
    GetKey_Routine();

    if( GAMEMODE_GAME <= game_type )
        GAME_init_check();                                              // ゲームの初期化



	if( mouse_click == 1 )
		mouse_click_time++;

	TASK_exec();

	if( mouse_click == -1 )
	{
		mouse_click = 0;
		mouse_click_time = 0;
	}
}










function onDeviceMotion(e) 
{
    e.preventDefault();
    // 重力加速度を取得
    var ag = e.accelerationIncludingGravity;
    // 重力加速度ベクトルの大きさを取得
    var acc = Math.sqrt(ag.x*ag.x + ag.y*ag.y + ag.z*ag.z);
    // 
    if (_isStep) {
        // 歩行中にしきい値よりも低ければ一歩とみなす
        if (acc < GRAVITY_MIN) {
            _step++;
            _isStep = false;
        }
    } else {
        // しきい値よりも大きければ歩いているとみなす
        if (acc > GRAVITY_MAX) {
            _isStep = true;
        }
    }
}







//---------------------------------------------------------
//	ゲーム起動
//---------------------------------------------------------
function newGame() 
{
	let ua = navigator.userAgent;
	let rootElement = document.documentElement;


	SOZ_buffer_x = window.screen.width * window.devicePixelRatio;
    SOZ_buffer_y = window.screen.height * window.devicePixelRatio;

	//console.log( "screen.width = " + screen.width );
	//console.log( "screen.height = " + screen.height );    
	//console.log( "window.devicePixelRatio = " + window.devicePixelRatio );
	//console.log( "解像度幅 = " + SOZ_buffer_x );
	//console.log( "解像度高 = " + SOZ_buffer_y );
    
    SOZ_screen_scale = 1.0;
	SOZ_screen_scale_parsent = ( SOZ_screen_scale * 100 ) + "%";
	
	document.addEventListener(EVENTNAME_TOUCHSTART, SOZ_Mouse_Get );
	document.addEventListener(EVENTNAME_TOUCHMOVE, SOZ_Mouse_Move );
	document.addEventListener(EVENTNAME_TOUCHEND, SOZ_Mouse_Release );
    window.addEventListener('devicemotion', onDeviceMotion);
	GAME_memory_get_routine();
	clearInterval( interval );						// ゲームタイマーをクリア

	SOZ_init();										//systemOZ初期化

	interval = setInterval( GAME_main_routine, 33 ); 	// 16ミリ秒ごとにmain_routineという関数を呼び出す
}

newGame();



