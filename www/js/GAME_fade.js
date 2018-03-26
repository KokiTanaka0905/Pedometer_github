//--------------------------------------------------------------------------------------
//
//	フェードイン・フェードアウトのプログラム
//
//		使用例）	FADE_Disp_Start( FADE_IN, FADE_WHITE, 0x0f );
//			
//		一つ目の引数に FADE_IN or FADE_OUT 二つ目の引数に カラー 三つ目の引数に スピード を指定してください 
//		
//--------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------
//	テクスチャ定義
//--------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------
//	定数定義のようなもの
//--------------------------------------------------------------------------------------
const FADE_IN		= 0;
const FADE_OUT		= 1;
const FADE_BLACK	= 0;
const FADE_WHITE	= 1;




//--------------------------------------------------------------------------------------
//	変数定義
//--------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------
//	矩形データ
//--------------------------------------------------------------------------------------
const fade_parts =
[
	[ 0, 0, 2, 2, 1, 1 ],
];



//--------------------------------------------------------------------------------------
//	フェード用のグラフィックの読み込み
//--------------------------------------------------------------------------------------
function FADE_grp_load( )
{
	SOZ_Texture_Load( TEXTURE_FADE_BLACK		, "grp/fade/fade_black.png" );
	SOZ_Texture_Load( TEXTURE_FADE_WHITE		, "grp/fade/fade_white.png" );
}




//--------------------------------------------------------------------------------------
//	フェードイン・フェードアウト
//--------------------------------------------------------------------------------------
function FADE_disp_exec( ap )
{
	switch( work1[ ap ] )
	{
		case FADE_IN:
			base_color_a[ ap ] -= work2[ ap ];	// だんだん薄く
			if( base_color_a[ ap ] <= 0x10 )
			{
				base_color_a[ ap ] = 0x00;
				TASK_end( ap );
				return;
			}
			break;
		
		case FADE_OUT:
			base_color_a[ ap ] += work2[ ap ];	// だんだん濃く
			if( 0xff <= base_color_a[ ap ] )
			{
				console.log( "base_color_a[ ap ] = " + base_color_a[ ap ] );
				base_color_a[ ap ] = 0xff;
				TASK_end( ap );
				return;
			}
			break;
	}
}
function FADE_disp_start( io, color, speed )
{
	let ap;
	
	// カラー
	switch( color )
	{
		case FADE_BLACK:
			ap = TASK_start_GRP( FADE_disp_exec, 100, TEXTURE_FADE_BLACK, fade_parts, 0, "フェード" );
			break;
			
		case FADE_WHITE:
			ap = TASK_start_GRP( FADE_disp_exec, 100, TEXTURE_FADE_WHITE, fade_parts, 0, "フェード" );
			break;
	}
	
	// フェードイン or フェードアウト
	switch( io )
	{
		case FADE_IN:
			base_color_a[ ap ] = 0xff;
			break;
			
		case FADE_OUT:
			base_color_a[ ap ] = 0x00;
			break;
	}
	
	pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
	pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
	pos_p[ ap ] = 100000 * WP;
	scale_x[ ap ] = 650 * WP;
	scale_y[ ap ] = 360 * WP;
	work1[ ap ] = io;
	work2[ ap ] = speed;
}