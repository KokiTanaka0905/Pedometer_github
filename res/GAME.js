//--------------------------------------------------------------------------------------
//
//	GDC提供：サマーキャンプレースゲーム
//
//						BLAZING TRAIL (ブレイジングトレイル）
//
//															Programed by R-TOHYA
//--------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------
//ゲームモード定義
//--------------------------------------------------------------------------------------
const GAMEMODE_INIT					= 0;
const GAMEMODE_GDCLOGO				= 100;
const GAMEMODE_TITLE				= 200;
const GAMEMODE_OPENING				= 300;
const GAMEMODE_GAME					= 500;



//--------------------------------------------------------------------------------------
//使用するテクスチャ定義
//--------------------------------------------------------------------------------------
const TEXTURE_GDCLOGO		= 0;		
const TEXTURE_BG			= 1;	
const TEXTURE_TESTOBJ		= 2;	
const TEXTURE_TITLE			= 3;
const TEXTURE_ROOM_PARTS	= 4;
const TEXTURE_HITCHECK		= 5;
const TEXTURE_PLAYER_IDLING	= 6;
const TEXTURE_KIDS			= 7;
const TEXTURE_FADE_BLACK	= 10;
const TEXTURE_FADE_WHITE	= 11;



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
//外部変数
//--------------------------------------------------------------------------------------
let interval;  											// ゲームを実行するタイマーを保持する変数

let hitrect_visible_flag = 0;



//--------------------------------------------------------------------------------------
//矩形データ
//--------------------------------------------------------------------------------------
const uv1280=
[
	[ 0, 0, 1280, 720, 1280 / 2, 720 / 2 ],
];

const hit_check_rect =
[
	[ 4, 4, 2, 2, 0, 0 ],
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
	SOZ_Texture_Load( TEXTURE_GDCLOGO		, "grp/gdc_logo.png" );
	SOZ_Texture_Load( TEXTURE_BG			, "grp/base.png" );
	SOZ_Texture_Load( TEXTURE_ROOM_PARTS	, "grp/room_parts.png" );
//	SOZ_Texture_Load( TEXTURE_TESTOBJ		, "grp/room3.png" );
	SOZ_Texture_Load( TEXTURE_TITLE			, "grp/title.png" );
	SOZ_Texture_Load( TEXTURE_HITCHECK		, "grp/hit_check.png" );
	SOZ_Texture_Load( TEXTURE_PLAYER_IDLING	, "grp/gomashio.png" );
	SOZ_Texture_Load( TEXTURE_KIDS			, "grp/kids.png" );
	SOZ_Texture_Load( TEXTURE_PLANE			, "grp/airplane01.png" );



	SOZ_Texture_Load( TEXTURE_OPEN1			, "grp/open1.png" );
	SOZ_Texture_Load( TEXTURE_OPEN2			, "grp/open2.png" );
	SOZ_Texture_Load( TEXTURE_OPEN3			, "grp/open3.png" );
	SOZ_Texture_Load( TEXTURE_OPENMES		, "grp/openmes.png" );



}






//---------------------------------------------------------
// タイトル文字（動くタイプ）
//---------------------------------------------------------
function GAME_title_moji_demo( ap )
{
	switch( work1[ ap ] )
	{
		case 0:					//縮小
			scale_x[ ap ] -= WP / 25;
			scale_y[ ap ] = scale_x[ ap ];

			work2[ ap ]++;
			work2[ ap ] %= 2;
			if( work2[ ap ] == 0)
				MENU_title_ill_start( ap );

			if( scale_y[ ap ] <= WP )
			{
				scale_x[ ap ] = WP;
				scale_y[ ap ] = WP;
				work1[ ap ]++;
			}
			break;
	}
}




//---------------------------------------------------------
//　ボタンを押せ、の点滅
//---------------------------------------------------------
function GAME_taphere_exec( ap )
{
	if( work9[ ap ] == 99999 )
	{
		work9[ ap ]  = 0;
		game_type++;
	}
	
	switch( work1[ ap ] )
	{
		case 0:
			base_color_a[ ap ] -= 3;
			if(base_color_a[ ap ] <= 90 )
			{
				work1[ ap ] = 1;
			}
			break;
		case 1:
			base_color_a[ ap ] += 3;
			if(base_color_a[ ap ] >= 250 )
			{
				work1[ ap ] = 0;
			}
			break;
	}
}




//---------------------------------------------------------
// タイトル配置
//---------------------------------------------------------
function GAME_title_start( )
{
	let ap;

	ap = TASK_start_GRP( GAME_title_moji_demo, 6, TEXTURE_TITLE, title_parts, 2, "タイトル" );
	task_delay[ ap ] = 180 + 60;
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 100 * WP;
	pos_p[ ap ] = 10000 * WP;
	scale_x[ ap ] = 3 * WP;
	scale_y[ ap ] = scale_x[ ap ];
	work1[ ap ] = 0;

	ap = TASK_start_GRP( GAME_taphere_exec, 6, TEXTURE_TITLE, title_parts, 6, "TAP HERE" );
	task_delay[ ap ] = 300;
	pos_x[ ap ] = 156 * WP;
	pos_y[ ap ] = 718 * WP;
	pos_p[ ap ] = 45000 * WP;
	work9[ ap ] = 99999;
	work1[ ap ] = 0;
}








//---------------------------------------------------------
// GDCロゴ表示
//---------------------------------------------------------
function GAME_gdc_logo_exec( ap )
{
	if( !( game_type == GAMEMODE_GDCLOGO || game_type == GAMEMODE_GDCLOGO + 1) )
	{
		base_color_a[ ap ] -= 20;
		if( base_color_a[ ap ] <= 0 )
		{
			TASK_end( ap );
			return;
		}
	} 
}
function GAME_gdc_logo_start()
{
	let ap;
	ap = TASK_start_GRP( GAME_gdc_logo_exec, 4, TEXTURE_GDCLOGO, uv1280, 0, "GDCロゴ表示" );
	pos_x[ ap ] = ( WINDOW_WIDTH / 2 ) * WP;
	pos_y[ ap ] = ( WINDOW_HEIGHT / 2 ) * WP;
	pos_p[ ap ] = 100000 * WP;
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

function GAME_main_routine() 
{
	SE_exec();
	
	// SHIFT を押しながら H で当たり判定の表示切替
	if( SOZ_Inkey_DAT( DIK_LSHIFT ) != 0 && SOZ_Inkey_TRG( DIK_H ) != 0 )
		hitrect_visible_flag++;
	
	if( hitrect_visible_flag % 2 != 0 )
		Visualize_CollisionDetection();

	click_object = -1;
	if( SOZ_Mouse_Button( 0 ) != 0 && ( game_type == GAMEMODE_TITLE || game_type == GAMEMODE_GAME + 1 ) )
	{
		click_object = CLICK_click_obj( mouse_x, mouse_y);
		console.log( mouse_x +"  "+ mouse_y );
	}

	switch( game_type )
	{
		//ゲーム初期化
		case GAMEMODE_INIT:
			ctx.font = "16px 'メイリオ ボールド'"

			SE_load();									//効果音の読み込み
			TASK_all_init( );							//タスクの全消去
			GAME_system_grp_load();						//一番最初にロードすべきもの	
//			SAVEDATA_gameload_1st();					//一番最初のセーブデータ読み込み
			game_type = GAMEMODE_GDCLOGO;

			break;


		//GDCロゴ
		case GAMEMODE_GDCLOGO: 									//ゲーム著作表示（GDC)
			GAME_gdc_logo_start();				//ロゴ表示
			gt_counter = 0;
			game_type++;
			break;

		case GAMEMODE_GDCLOGO + 1:								//特定時間過ぎたら
			gt_counter++;
			if( gt_counter >= 90 )
			{
				ROOM_1st_start();
				TITLE_start();
				MUSIC_Start( 1, 1 );
				gt_counter = 0;
				game_type = GAMEMODE_TITLE;
			}
			break;



		//タイトル
		case GAMEMODE_TITLE:
			if( SOZ_Mouse_Button( 0 ) != 0 )
			{
				gt_counter = 0;
				gt_loop = 0;
				game_type = GAMEMODE_OPENING;				
				game_type = GAMEMODE_GAME;				
			}
			break;


		//オープニング
		case GAMEMODE_OPENING:
			if( gt_counter == 0 )
				OPENING_grp_out( gt_loop );					//画像発生

			gt_counter++;
			if( gt_counter >= 180 )							
			{
				if( SOZ_Mouse_Button( 0 ) == 0 )
				{
					gt_counter = 0;
					gt_loop++;
					if( gt_loop >= 3 )
						game_type = GAMEMODE_GAME;
				}
			}
			break;


		//ゲーム本体
		case GAMEMODE_GAME:											//ゲームに行く前の準備
			//PLAYER_gomashio_idling_start();
			PLAYER_gomashio_start();
			game_type++;
			break;

		case GAMEMODE_GAME + 1:											//ゲームに行く前の準備
			break;


	}

	GetKey_Routine();

	if( mouse_click == 1 )
		mouse_click_time++;

	TASK_exec();

	if( mouse_click == -1 )
	{
		mouse_click = 0;
		mouse_click_time = 0;
	}
}





//---------------------------------------------------------
//	ゲーム起動
//---------------------------------------------------------
function newGame() 
{
	document.addEventListener(EVENTNAME_TOUCHSTART, SOZ_Mouse_Get );
	document.addEventListener(EVENTNAME_TOUCHMOVE, SOZ_Mouse_Move );
	document.addEventListener(EVENTNAME_TOUCHEND, SOZ_Mouse_Release );
	GAME_memory_get_routine();
	clearInterval( interval );						// ゲームタイマーをクリア

	SOZ_init();										//systemOZ初期化

	interval = setInterval( GAME_main_routine, 33 ); 	// 16ミリ秒ごとにmain_routineという関数を呼び出す
}

newGame();



