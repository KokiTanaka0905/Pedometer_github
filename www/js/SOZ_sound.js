//---------------------------------------------------------
//  SystemOZ for HTML5
//
//				レンダリングプログラム
//
//									  programed by R-TOHYA
//---------------------------------------------------------


const  SE_MAX	= 100;





let	se_init_check = 0;
let se_out_wait = [ SE_MAX ];

let se_name =
[
	"decide-0",
	"decide-1",
	"decide-2",
	"decide-3",
	"decide-4",

	"skile-0",
	"skile-1",
	"skile-2",
	"skile-3",
	"skile-4",

	"clash-0",
	"clash-1",
	"clash-2",
	"clash-3",
	"clash-4",

	"gear-0",
	"gear-1",
	"gear-2",
	"gear-3",
	"gear-4",

	"engine0-0",
	"engine0-1",
	"engine0-2",
	"engine0-3",
	"engine0-4",
	"engine1-0",
	"engine1-1",
	"engine1-2",
	"engine1-3",
	"engine1-4",
	"engine2-0",
	"engine2-1",
	"engine2-2",
	"engine2-3",
	"engine2-4",
	"engine3-0",
	"engine3-1",
	"engine3-2",
	"engine3-3",
	"engine3-4",
	"engine4-0",
	"engine4-1",
	"engine4-2",
	"engine4-3",
	"engine4-4",
	"engine5-0",
	"engine5-1",
	"engine5-2",
	"engine5-3",
	"engine5-4",
	"engine6-0",
	"engine6-1",
	"engine6-2",
	"engine6-3",
	"engine6-4",
	"engine7-0",
	"engine7-1",
	"engine7-2",
	"engine7-3",
	"engine7-4",
	"engine8-0",
	"engine8-1",
	"engine8-2",
	"engine8-3",
	"engine8-4",
	"engine9-0",
	"engine9-1",
	"engine9-2",
	"engine9-3",
	"engine9-4",
	"engine10-0",
	"engine10-1",
	"engine10-2",
	"engine10-3",
	"engine10-4",
	"engine11-0",
	"engine11-1",
	"engine11-2",
	"engine11-3",
	"engine11-4",
	"engine12-0",
	"engine12-1",
	"engine12-2",
	"engine12-3",
	"engine12-4",



]; 




//---------------------------------------------------------
//  効果音
//---------------------------------------------------------
let audios = 
{

	"decide-0": new Audio("grp/se/decide.mp3"),				//0:決定音
	"decide-1": new Audio("grp/se/decide.mp3"),
	"decide-2": new Audio("grp/se/decide.mp3"),
	"decide-3": new Audio("grp/se/decide.mp3"),
	"decide-4": new Audio("grp/se/decide.mp3"),


};










let	se_no_control = [ SE_MAX ]; 

let BGM = -1;



//---------------------------------------------------------
//  BGMの再生
//---------------------------------------------------------

function BGM_play( sound_filenanme )
{
	BGM = new Audio( sound_filenanme );
	BGM.load();
	BGM.play();
}

//---------------------------------------------------------
//  BGMストップ
//---------------------------------------------------------
function BGM_stop( )
{
	if( BGM != -1 )
	{
		BGM.pause();
		BGM = -1;
	}
}









//---------------------------------------------------------
//  効果音のローディング
//---------------------------------------------------------
function SE_load( )
{
	let i;
	
	for( i in audios)
	{
		audios[ i ].load();
	}
	
	for( i = 0; i < SE_MAX; i++ )
	{
		se_no_control[ i ] = 0;
	}
}







//---------------------------------------------------------
//  効果音の再生
//---------------------------------------------------------
function SE_play_vol( se_number, vol )
{
	let se_no, bit;
	
	if( se_out_wait[ se_number ] == 0 )
	{
		se_no_control[ se_number ]++;
		if( se_no_control[ se_number ] >= 5 || se_no_control[ se_number ] < 0 )
		{
			se_no_control[ se_number ] = 0;
		}

		se_no = ( se_number ) * 5 + se_no_control[ se_number ];
		audios[ se_name[ se_no ] ].play();
		audios[ se_name[ se_no ] ].volume = vol; 
		se_out_wait[ se_number ] = 5;	
	}
}



//---------------------------------------------------------
//  効果音の再生
//---------------------------------------------------------
function SE_play( se_number )
{
	SE_play_vol( se_number, 1.0 );
}



//---------------------------------------------------------
//  効果音の再生（直接番号指定）
//---------------------------------------------------------
function SE_play_direct( se_number )
{
	let se_no, bit;
	audios[ se_name[ se_number ] ].play();
}






//---------------------------------------------------------
//  効果音の管理の初期化
//---------------------------------------------------------
function SE_init( )
{
	let i;

	for( i = 0; i < SE_MAX; i++ )
	{
		se_out_wait[ i ] = 0;
	}
}





//---------------------------------------------------------
//  効果音の管理（メインルーチンから実行し続けること )
//---------------------------------------------------------
function SE_exec( )
{
	if( se_init_check ==  0 )
	{
		SE_init();
		se_init_check = 1;
	}
		
	for( i = 0; i < SE_MAX; i++ )
	{
		se_out_wait[ i ]--;
		if( se_out_wait[ i ] < 0 )
		{
			se_out_wait[ i ] = 0;
		}
	}
		
}



//-----------------------------------------------------------------------------
//	音楽の番号定義
//-----------------------------------------------------------------------------
const MUSIC_EXAMPLE	= 1;




let music_name_str =		//曲ファイルの場所を文字列として登録する配列
[
	[ "" ],								//↓music_name[]での番号と、曲名
	[ "grp/music/gomashio_night.mp3" ],			//1 
]

	



//---------------------------------------------------------
// 	BGMの再生
//---------------------------------------------------------
function SOZ_Music_Load_with_volume( channel, string, vol, loop )
{
	//BGM = new Audio( sound_filename );
	BGM = new Audio( string );
	BGM.load();
	BGM.muted = false;
	
	//BGM.loop = true;    // これで勝手にループしてくれる
	if( loop == 0 )
		BGM.loop = false;
	else
		BGM.loop = true;
	
    BGM.play();
}




//-----------------------------------------------------------------------------
//	BGMの再生
//-----------------------------------------------------------------------------
function MUSIC_Start( no, loop )
{
	//console.log( no )
	SOZ_Music_Load_with_volume( 0, music_name_str[ no ], 0, loop );
}



//-----------------------------------------------------------------------------
//	BGMの再生をストップ
//-----------------------------------------------------------------------------
function SOZ_Music_Stop( channel )
{
	if( BGM != null )
    {
		BGM.pause();
		BGM.currentTime = 0;
		BGM = null;
        delete BGM;     // 解放
    }
	return;
}