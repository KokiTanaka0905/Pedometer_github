//--------------------------------------------------------------------------------------
//
//セーブデータ管理
//
//--------------------------------------------------------------------------------------
let step_number_table = new Array( 120 );
let game_data_table = new Array( 1 ); 
let last_boot_time;


//---------------------------------------------------------
//    セーブデータのセーブ
//---------------------------------------------------------
function SAVEDATA_gamesave()
{
	let gamesavedata;
    
    console.log( "セーブデータ保存" );
	gamesavedata = JSON.stringify( step_number_table );  		    //チーム構成の保存 
	localStorage.setItem( 'angel_step_number', gamesavedata );      //

    gamesavedata = JSON.stringify( game_data_table );
    localStorage.setItem( 'angel_game_data_table', gamesavedata );
    
    gamesavedata = JSON.stringify( last_boot_time );
    localStorage.setItem( 'angel_last_boot_time', gamesavedata );
}



//---------------------------------------------------------
//	セーブデータのロード
//---------------------------------------------------------
function SAVEDATA_gameload()
{
	let gamesavedata;
    
    console.log( "セーブデータの読み込み" );
	gamesavedata = localStorage.getItem( 'angel_step_number' );     //チーム構成の保存
	step_number_table = JSON.parse( gamesavedata );  			    //どんなものだろうと文字列に変換する必要があるらしい。
    
    gamesavedata = localStorage.getItem( 'angel_game_data_table' );
    game_data_table = JSON.parse( gamesavedata );
    
    gamesavedata = localStorage.getItem( 'angel_last_boot_time' );
    last_boot_time = JSON.parse( gamesavedata );
}



//---------------------------------------------------------
//	セーブデータの削除
//---------------------------------------------------------
function SAVEDATA_gameclear()
{
	console.log( "セーブデータ削除" );
	localStorage.removeItem( 'angel_step_number' );
    localStorage.removeItem( 'angel_game_data_table' );
    localStorage.removeItem( 'angel_last_boot_time' );
}




//---------------------------------------------------------
//	セーブデータの初期化
//---------------------------------------------------------
function SAVEDATA_gamesave_init()
{
	let ans, ans2;
    
    ans     = window.localStorage.getItem( 'angel_step_number' );
    ans2    = window.localStorage.getItem( 'angel_game_data_table' );
    ans3    = window.localStorage.getItem( 'angel_last_boot_time' );
    
    if( ans == null || ans2 == null || ans3 == null )
    {    
		console.log( "セーブデータの完全に初期化" );
        last_boot_time = new Date();    
		localStorage.clear();           
		return 1;
	}
	
	return 0;
}



//---------------------------------------------------------
//	起動直後のローディング（データがなかった場合は新構築する）
//---------------------------------------------------------
function SAVEDATA_gameload_1st()
{
	if( SAVEDATA_gamesave_init() == 0 )
	{
		SAVEDATA_gameload();
	}
}



