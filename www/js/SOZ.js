//---------------------------------------------------------
//  SystemOZ for HTML5
//
//				systemOZ ルーチン
//
//									  programed by R-TOHYA
//---------------------------------------------------------

const SYSTEM_WEB		= 0;
const SYSTEM_PHONE		= 1;

let		SOZ_buffer_x, SOZ_buffer_y;											//画面バッファリングサイズ
let		SOZ_screen_scale;
let		SOZ_screen_scale_parsent;
let		game_type = 0, game_type2 = 0, game_type3 = 0, game_type4 = 0;		// プログラム進行度
const 	control_system = SYSTEM_WEB;




function SOZ_init()
{
	let i, x;
	
	TASK_all_init();							//すべて初期化
	SOZ_sinbox_init();							//計算系テーブルの初期化

	for( i = 0; i < 256; i++ )
	{
		keyboard_status[ i ] = 0;
		key_dat[ i ] = 0;
		key_trg[ i ] = 0;
	}

	for( i = 0; i < TASK_MAX; i++ )
	{
		str[ i ] = new Array( 256 );
		font_name[ i ] = new Array( 64 );
		for( x = 0; x < 256; x++) 
			str[ i ][ x ] = 0;
	}
}

