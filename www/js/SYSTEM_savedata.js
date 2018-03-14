//--------------------------------------------------------------------------------------
//
//セーブデータ管理
//
//--------------------------------------------------------------------------------------

let gamesavedata;



//---------------------------------------------------------
//	セーブデータのセーブ
//---------------------------------------------------------
function SAVEDATA_gamesave()
{
	console.log( "セーブデータ保存" );
	gamesavedata = JSON.stringify( time_recode );  									//チーム構成の保存 
	localStorage.setItem( 'blazing_trail_times', gamesavedata );   //
}



//---------------------------------------------------------
//	セーブデータのロード
//---------------------------------------------------------
function SAVEDATA_gameload()
{
	console.log( "セーブデータの読み込み" );
	gamesavedata = localStorage.getItem( 'blazing_trail_times' );    //チーム構成の保存
	time_recode = JSON.parse( gamesavedata );  										  //どんなものだろうと文字列に変換する必要があるらしい。 
}



//---------------------------------------------------------
//	セーブデータの削除
//---------------------------------------------------------
function SAVEDATA_gameclear()
{
	console.log( "セーブデータ削除" );
	localStorage.removeItem( 'blazing_trail_times' );
}




//---------------------------------------------------------
//	セーブデータの初期化
//---------------------------------------------------------
function SAVEDATA_gamesave_init()
{
	if( localStorage.blazing_trail_times == undefined )
    {    
		console.log( "セーブデータの完全に初期化" );
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



