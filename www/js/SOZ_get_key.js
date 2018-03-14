//--------------------------------------------------------------------------------------
//
//	systemOZ　キー入力プログラム
//
//--------------------------------------------------------------------------------------

//let EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';

let supportTouch = 'ontouchstart' in document;
let EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
let EVENTNAME_TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
let EVENTNAME_TOUCHEND = supportTouch ? 'touchend' : 'mouseup';


let touch_zoom = 1 / document.body.style.zoom;
let mouse_x, mouse_y;
let mouse_x_last, mouse_y_last, mouse_click = 0, mouse_click_time = 0;

//--------------------------------------------------------------------------------------
//		変数定義
//--------------------------------------------------------------------------------------
let keyboard_status = new Array(256);
let key_dat = new Array(256);
let key_trg = new Array(256);
let get_key_type = 0;




//--------------------------------------------------------------------------------------
//		DirectXと同じ変数名にしておく define欲しい
//--------------------------------------------------------------------------------------
const DIK_ESCAPE      = 0x1b;     // esc
const DIK_1           = 0x31;     // 1
const DIK_2           = 0x32;     // 2
const DIK_3           = 0x33;     // 3
const DIK_4           = 0x34;     // 4
const DIK_5           = 0x35;     // 5
const DIK_6           = 0x36;     // 6
const DIK_7           = 0x37;     // 7
const DIK_8           = 0x38;     // 8
const DIK_9           = 0x39;     // 9
const DIK_0           = 0x30;     // 0

const DIK_A           = 0x41;     // A
const DIK_B           = 0x42;     // B
const DIK_C           = 0x43;     // C
const DIK_D           = 0x44;     // D
const DIK_E           = 0x45;     // E
const DIK_F           = 0x46;     // F
const DIK_G           = 0x47;     // G
const DIK_H           = 0x48;     // H
const DIK_I           = 0x49;     // I
const DIK_J           = 0x4a;     // J
const DIK_K           = 0x4b;     // K
const DIK_L           = 0x4c;     // L
const DIK_M           = 0x4d;     // M
const DIK_N           = 0x4e;     // N
const DIK_O           = 0x4f;     // O
const DIK_P           = 0x50;     // P
const DIK_Q           = 0x51;     // Q
const DIK_R           = 0x52;     // R
const DIK_S           = 0x53;     // S
const DIK_T           = 0x54;     // T
const DIK_U           = 0x55;     // U
const DIK_V           = 0x56;     // V
const DIK_W           = 0x57;     // W
const DIK_X           = 0x58;     // X
const DIK_Y           = 0x59;     // Y
const DIK_Z           = 0x5a;     // Z

const DIK_LEFT        = 0x25;     // ←
const DIK_UP          = 0x26;     // ↑
const DIK_RIGHT       = 0x27;     // →
const DIK_DOWN        = 0x28;     // ↓

const DIK_LSHIFT      = 0x10;     // left shift

// 残りは随時追加してください


//--------------------------------------------------------------------------------------
//		押されたキーを調べる
//--------------------------------------------------------------------------------------
document.onkeydown = function( e )
{
	if( !e )
		e = window.event;

	let key_code = e.keyCode;	

	// 押されたキーコード部分
	keyboard_status[ key_code ] = true;

	// ブラウザのデフォルト機能を無効化 他にあれば追加してください
	if( key_code == DIK_UP || key_code == DIK_DOWN || key_code == DIK_RIGHT || key_code == DIK_LEFT )
	{
		if( e.preventDefault )
		{
			e.preventDefault();
		}
	}
}



//--------------------------------------------------------------------------------------
//		離されたキーを調べる
//--------------------------------------------------------------------------------------
document.onkeyup = function( e )
{
	if( !e )
		e = window.event;

	let key_code = e.keyCode;

	keyboard_status[ key_code ] = false;
}







//--------------------------------------------------------------------------------------
// 		入力状況を返す DAT
//--------------------------------------------------------------------------------------
function SOZ_Inkey_DAT( key_num )
{
	if( key_dat[ key_num ] != 0 )
	{
		return true;
	}

	return false;
}



//--------------------------------------------------------------------------------------
// 		入力状況を返す TRG
//--------------------------------------------------------------------------------------

function SOZ_Inkey_TRG( key_num )
{
	if( key_trg[ key_num ] != 0 )
    {
		return true;
	}

	return false;
}







//--------------------------------------------------------------------------------------
// 		指定したキーの情報を得る
//--------------------------------------------------------------------------------------
function SOZ_Inkey_Get()
{
	let i;
	let rect;

	for( i = 0; i < 256; i++ )
	{
		if( keyboard_status[ i ] != false )
		{
			key_dat[ i ]++;
		}
		else
		{
			key_dat[ i ] = 0;
		}


	    // TRGも作成
		if( key_dat[ i ] == 1 )
		{
		    key_trg[ i ] = 1;
		}
		else
		{
		    key_trg[ i ] = 0;
		}
	}
}






//--------------------------------------------------------------------------------------
// 		キー入力関連の関数を呼ぶ
//--------------------------------------------------------------------------------------

function GetKey_Routine()
{
	let i;
	
	switch( get_key_type )
	{
		case 0:

			// 配列内を初期化
			for( i = 0; i < 256; i++ )
			{
				keyboard_status[ i ] = false;
			}
			get_key_type++;
			break;

		case 1:
			SOZ_Inkey_Get();
			break;
	}
}






























//--------------------------------------------------------------------------------------
// 		マウスイベント 押された瞬間に割り込みで飛んでくる
//--------------------------------------------------------------------------------------
function SOZ_Mouse_Get( event )
{		
	touch_zoom = 1 / document.body.style.zoom;
//	touch_zoom *= SOZ_screen_scale;

	//マウス（タッチ）の情報を作る
    rect = event.target.getBoundingClientRect();

    if( event.changedTouches )
    {
		//スマホ、タブレットなど
	    mouse_x = ( event.targetTouches[0].pageX - rect.left ) * touch_zoom;
	    mouse_y = ( event.targetTouches[0].pageY - rect.top ) * touch_zoom;
	}
    else
    {
		//WINDOWS、LINUXなど
        mouse_x = event.clientX - rect.left;
        mouse_y = event.clientY - rect.top;
    }
    
    mouse_click = 1;
    mouse_click_time = 1;
}


//--------------------------------------------------------------------------------------
// 		マウスイベント タッチ状態で移動させるとマウスの座標が動く
//--------------------------------------------------------------------------------------
function SOZ_Mouse_Move( event )
{
	if( mouse_click >= 1 )
	{
	    rect = event.target.getBoundingClientRect();
	    if( event.changedTouches )
	    {
			//スマホ、タブレットなど
		    mouse_x = ( event.targetTouches[0].pageX - rect.left ) * touch_zoom;
		    mouse_y = ( event.targetTouches[0].pageY - rect.top ) * touch_zoom;
	    }
	    else
	    {
	        mouse_x = event.clientX - rect.left;
	        mouse_y = event.clientY - rect.top;
	    }
	}
}

//--------------------------------------------------------------------------------------
// 		マウスイベント 離した瞬間に割り込みで飛んでくる
//--------------------------------------------------------------------------------------
function SOZ_Mouse_Release( event )
{
    rect = event.target.getBoundingClientRect();
    if( event.changedTouches )
    {
		//スマホ、タブレットなど
//	    mouse_x = ( event.targetTouches[0].pageX - rect.left ) * touch_zoom;
//	    mouse_y = ( event.targetTouches[0].pageY - rect.top ) * touch_zoom;
    }
    else
    {
        mouse_x = event.clientX - rect.left;
        mouse_y = event.clientY - rect.top;
    }
    

    mouse_click = -1;

}


//--------------------------------------------------------------------------------------
// 		マウスのボタン状況を取得する
//    0:押されてない 1:押し続けている時 2:ボタンを離した瞬間
//--------------------------------------------------------------------------------------
function SOZ_Mouse_Button( button )
{
	return mouse_click;
}


//--------------------------------------------------------------------------------------
// 		マウスの座標を得るラッピングプログラム（WINDOWS対応）
//--------------------------------------------------------------------------------------
function SOZ_Mouse( x, y )
{
	//中身は特にいらない。マウスの座標は mouse_x, mouse_yを見るか、下の座標取得関数を参照のこと
}

//--------------------------------------------------------------------------------------
// 		マウスのX座標を得るプログラム
//--------------------------------------------------------------------------------------
function SOZ_Mouse_X(  )
{
	return mouse_x;
}

//--------------------------------------------------------------------------------------
// 		マウスのY座標を得るプログラム
//--------------------------------------------------------------------------------------
function SOZ_Mouse_Y( )
{
	return mouse_y;
}





