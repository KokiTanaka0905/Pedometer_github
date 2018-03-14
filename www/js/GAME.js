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
const GAMEMODE_GAME					= 500;
const GAMEMODE_DEBUG                = 999;


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

const TEXTURE_TEST_RED      = 12;
const TEXTURE_TEST_BLUE     = 13;

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
//外部変数
//--------------------------------------------------------------------------------------
let interval;  											// ゲームを実行するタイマーを保持する変数

let hitrect_visible_flag = 0;

// 重力加速度のしきい値
const GRAVITY_MIN = 9.8;
const GRAVITY_MAX = 12.00;
// 歩数
let _step = 0;
// 現在歩いているかどうか
let _isStep = false;




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

const test_red_rect =
[
    [ 0, 0, 640, 1136, 640 / 2, 1136 / 2 ],
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
	SOZ_Texture_Load( TEXTURE_LINE			, "grp/line_0.png" );

    SOZ_Texture_Load( TEXTURE_TEST_RED    	, "grp/test.png" );
    SOZ_Texture_Load( TEXTURE_TEST_BLUE     , "grp/test2.png" );   

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
// デバッグモード時には青いグラフィックを
//---------------------------------------------------------
function GAME_test_blue_square_exec( ap )
{
  
}
function GAME_test_blue_square_start()
{
    let ap;
    ap = TASK_start_GRP( GAME_test_blue_square_exec, 100, TEXTURE_TEST_BLUE, test_red_rect, 0, "青いいグラフィックを" );
    pos_x[ ap ] = ( WINDOW_WIDTH / 2 ) * WP;
	pos_y[ ap ] = ( WINDOW_HEIGHT / 2 ) * WP;
	pos_p[ ap ] = 200 * WP;
    base_color_a[ ap ] = 255 / 2;
}





//---------------------------------------------------------
// デバッグモードへ移動させる
//---------------------------------------------------------
function GAME_jump_debug_mode_exec( ap )
{
    work3[ ap ]--;
    if( 1 == mouse_click )              // タッチされた！
    {    
        work3[ ap ] = work2[ ap ];
        work1[ ap ]++;
    }
    
    if( work3[ ap ] < 0 )               // 一定時間経過したら連打判定にはならない
        work1[ ap ] = 0;
        
    if( work4[ ap ] <= work1[ ap ] )    // 指定した回数連打されたら
    {    
        GAME_test_blue_square_start();
        game_type = GAMEMODE_DEBUG;
        console.log( "jump" );
        TASK_end( ap );
        return;
    }
}
function GAME_jump_debug_mode()
{
    let ap;
    ap = TASK_start( GAME_jump_debug_mode_exec, 100, "デバッグモードへ移動させる" );
    task_id[ ap ] = TASK_PROGRAM;
    work1[ ap ] = 0;                // タッチ数をカウントする
    work2[ ap ] = 10;               // 連打判定に用いる
    work3[ ap ] = 0;                // タッチされてから次にタッチされるまでの時間をカウントする
    work4[ ap ] = 5;                // 何度連打されたらデバッグモードへ移動させるか 
}






//---------------------------------------------------------
// 試しに赤いグラフィックを
//---------------------------------------------------------
function GAME_test_red_square_exec( ap )
{
    if( mouse_click < 1 )
        base_color_a[ ap ] = 0;
    else
        base_color_a[ ap ] = 255;
}
function GAME_test_red_square_start()
{
    let ap;
    ap = TASK_start_GRP( GAME_test_red_square_exec, 0, TEXTURE_TEST_RED, test_red_rect, 0, "試しに赤いグラフィックを" );
	pos_x[ ap ] = ( WINDOW_WIDTH / 2 ) * WP;
	pos_y[ ap ] = ( WINDOW_HEIGHT / 2 ) * WP;
	pos_p[ ap ] = 100 * WP;
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
    str[ ap ] = String( _step );
}
function GAME_step_number_start()
{
    let ap;
    ap = TASK_start_FONT( GAME_step_number_exec, 0, "", 0, 100 );
    pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
    pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
    pos_p[ ap ] = 200 * WP;
    str[ ap ] = String( _step );
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
    SE_exec();
	
	// SHIFT を押しながら H で当たり判定の表示切替
	if( SOZ_Inkey_DAT( DIK_LSHIFT ) != 0 && SOZ_Inkey_TRG( DIK_H ) != 0 )
		hitrect_visible_flag++;
	
	if( hitrect_visible_flag % 2 != 0 )
		Visualize_CollisionDetection();

	click_object = -1;
	if( SOZ_Mouse_Button( 0 ) != 0 && game_type == GAMEMODE_GAME + 1 )
	{
		click_object = CLICK_click_obj( mouse_x, mouse_y);
	}

	switch( game_type )
	{
		//ゲーム初期化
		case GAMEMODE_INIT:
			ctx.font = "16px 'メイリオ ボールド'";

			SE_load();									//効果音の読み込み
			TASK_all_init( );							//タスクの全消去
			GAME_system_grp_load();						//一番最初にロードすべきもの	
//			SAVEDATA_gameload_1st();					//一番最初のセーブデータ読み込み
			game_type = GAMEMODE_GAME;

			break;


		//ゲーム本体
		case GAMEMODE_GAME:											//ゲームに行く前の準備
			GAME_test_red_square_start();
            GAME_test_touch_pos_start();
            GAME_step_number_start();
			game_type++;
			break;

		case GAMEMODE_GAME + 1:											//ゲームに行く前の準備
			GAME_jump_debug_mode();
            game_type++;
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

	console.log( "screen.width = " + screen.width );
	console.log( "screen.height = " + screen.height );    
	console.log( "window.devicePixelRatio = " + window.devicePixelRatio );
	console.log( "解像度幅 = " + SOZ_buffer_x );
	console.log( "解像度高 = " + SOZ_buffer_y );
    
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



