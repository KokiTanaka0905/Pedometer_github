//--------------------------------------------------------------------------------------
//
//セーブデータ管理
//
//--------------------------------------------------------------------------------------
let step_number_table = new Array( 120 );
let game_data_table = new Array( 1 ); 
let recent_boot_time;
let last_boot_time;
let norma_step_number;
let life_value;



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
    
    gamesavedata = JSON.stringify( recent_boot_time );
    localStorage.setItem( 'angel_recent_boot_time', gamesavedata );
    
    gamesavedata = JSON.stringify( last_boot_time );
    localStorage.setItem( 'angel_last_boot_time', gamesavedata );
    
    gamesavedata = JSON.stringify( norma_step_number );
    localStorage.setItem( 'angel_norma_step_number', gamesavedata );
    
    gamesavedata = JSON.stringify( life_value );
    localStorage.setItem( 'angel_life_value', gamesavedata );
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
    
    gamesavedata = localStorage.getItem( 'angel_recent_boot_time' );
    recent_boot_time = JSON.parse( gamesavedata );
    
    gamesavedata = localStorage.getItem( 'angel_last_boot_time' );
    last_boot_time = JSON.parse( gamesavedata );
    
    gamesavedata = localStorage.getItem( 'angel_norma_step_number' );
    norma_step_number = JSON.parse( gamesavedata );

    gamesavedata = localStorage.getItem( 'angel_life_value' );
    life_value = JSON.parse( gamesavedata );
}



//---------------------------------------------------------
//	セーブデータの削除
//---------------------------------------------------------
function SAVEDATA_gameclear()
{
	console.log( "セーブデータ削除" );
	localStorage.removeItem( 'angel_step_number' );
    localStorage.removeItem( 'angel_game_data_table' );
    localStorage.removeItem( 'angel_recent_boot_time' );
    localStorage.removeItem( 'angel_last_boot_time' );
    localStorage.removeItem( 'angel_norma_step_number' );
    localStorage.removeItem( 'angel_life_value' );
}




//---------------------------------------------------------
//	セーブデータの初期化
//---------------------------------------------------------
function SAVEDATA_gamesave_init()
{
	let ans, ans2, ans3, ans4, ans5;
    
    ans     = window.localStorage.getItem( 'angel_step_number' );
    ans2    = window.localStorage.getItem( 'angel_game_data_table' );
    ans3    = window.localStorage.getItem( 'angel_recent_boot_time' );
    ans4    = window.localStorage.getItem( 'angel_last_boot_time' );
    ans5    = window.localStorage.getItem( 'angel_norma_step_number' );
    ans6    = window.localStorage.getItem( 'angel_life_value' );
    
    if( ans == null || ans2 == null || ans3 == null || 
        ans4 == null || ans5 == null || ans6 == null )
    {    
		console.log( "セーブデータの完全に初期化" );
        recent_boot_time = new Date();
        recent_boot_time.setHours(0);
        recent_boot_time.setMinutes(0);
        recent_boot_time.setSeconds(0);
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



