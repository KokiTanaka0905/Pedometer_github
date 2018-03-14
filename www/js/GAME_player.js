//---------------------------------------------------------
//
//				自機：ごましお
//
//---------------------------------------------------------


//---------------------------------------------------------
//  定数定義のようなもの
//---------------------------------------------------------
const PLAYER_IDLING	= 0;	// アイドリング
const PLAYER_SLIDE	= 10;	// 滑り台
const PLAYER_DASH	= 20;	// ダッシュ
const PLAYER_BED_ON	= 30;	// ベッドの上に出てくる
const PLAYER_LINE	= 40;	// ベッドの上に出てくる

const SEQ_WAIT		= 500;	// 待ち時間	



//---------------------------------------------------------
//  変数定義
//---------------------------------------------------------
let player_status = PLAYER_IDLING;



//---------------------------------------------------------
//  矩形データ
//---------------------------------------------------------
const player_idling_rect =
[
	[ 64 * 0 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 1 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 2 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 3 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 4 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 5 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 6 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 7 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 8 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
	[ 64 * 9 + 1, 0 + 1, 64 - 2, 96 - 2, ( 64 - 2 ) / 2, ( 96 - 2 ) / 2 ],
];

const player_slide_rect =
[
	[    0,    96,   192,    64,     32,    0],
	[  192,    96,   176,    64,     32,    0],
	[  384,    96,   192,    64,     32,    0],
	[  576,    96,   160,    64,     32,    0],
	[  736,    96,   176,    64,     32,    0],

	[  928,    96,   128,    80,     0,     0],
	[ 1056,    96,   160,    96,     32,    0],
	[ 1216,    96,   176,    96,     32,    0],
	[ 1408,    96,   176,    96,     32,    0],
	[ 1600,    96,   160,    96,     32,    0],
	[ 1792,    96,   160,    96,     32,    0],

	[    0,   160,   160,   112,     32,    0],
	[  288,   160,   128,   144,     32,    0],
	[  416,   160,    96,   160,     32,    0],
	[  512,   160,    96,   160,     32,    0],
	[  608,   160,    96,   160,     32,    0],
	[  704,   160,    96,   160,     32,    0],
	[  800,   160,    80,   160,     32,    0],

];

const player_dash_yoko_rect =
[
	[  0, 336,  96, 64,  96 / 2, 64 / 2 ],
	[ 96, 336, 112, 64, 112 / 2, 64 / 2 ],
];

const player_dash_shita_rect =
[
	[ 320, 336, 48, 80, 48 / 2, 80 / 2 ],
	[ 368, 336, 48, 80, 48 / 2, 80 / 2 ],
];

const player_dash_ue_rect =
[
	[ 208, 336, 32, 80, 32 / 2, 80 / 2 ],
	[ 240, 336, 32, 80, 32 / 2, 80 / 2 ],
];




//---------------------------------------------------------
//  ごましおシーケンス
//---------------------------------------------------------
let seq_preserve_array = new Array;

const idling_seq =
[
	player_idling_rect, 
	 0, SEQ_WAIT, 2,
	 1, SEQ_WAIT, 2,
	 2, SEQ_WAIT, 2,
	 3, SEQ_WAIT, 2,
	 4, SEQ_WAIT, 2,
	 5, SEQ_WAIT, 2,
	 6, SEQ_WAIT, 2,
	 7, SEQ_WAIT, 2,
	 6, SEQ_WAIT, 2,
	 7, SEQ_WAIT, 2,
	 8, SEQ_WAIT, 2,
	 9, SEQ_WAIT, 2,
	 8, SEQ_WAIT, 2,
	 9, SEQ_WAIT, 2,
	 8, SEQ_WAIT, 2,
	 9, SEQ_WAIT, 2,
];

const slide_seq =
[
	player_slide_rect,
	
	 0, SEQ_WAIT, 1,
	 1, SEQ_WAIT, 1,
	 2, SEQ_WAIT, 1,
	 3, SEQ_WAIT, 1,
	 4, SEQ_WAIT, 1,
	 5, SEQ_WAIT, 1,
	 6, SEQ_WAIT, 1,
	 7, SEQ_WAIT, 1,
	 8, SEQ_WAIT, 1,
	 9, SEQ_WAIT, 1,
	10, SEQ_WAIT, 1,
	11, SEQ_WAIT, 1,
	12, SEQ_WAIT, 1,
	13, SEQ_WAIT, 1,
	14, SEQ_WAIT, 1,
	15, SEQ_WAIT, 1,
	16, SEQ_WAIT, 1,
	17, SEQ_WAIT, 45,
];



//---------------------------------------------------------
//  保存領域の初期化
//---------------------------------------------------------
function PLAYER_preserve_array_init()
{
	let i;
	for( i = 0; i < 200; i++ )
		seq_preserve_array[ i ] = -1;
}



//---------------------------------------------------------
//  保存領域に入れていく
//---------------------------------------------------------
function PLAYER_preserve_array_set( seq )
{
	let i, c;
	c = seq.length;
	
	//for( )
}






//---------------------------------------------------------
//  ごましおアイドリング
//---------------------------------------------------------
function PLAYER_gomashio_idling_exec( ap )
{
	let i;
	
	if( player_status == PLAYER_IDLING )
	{	
		task_id[ ap ] = TASK_GRP;
		if( click_object == ap )
			player_status = PLAYER_DASH;
	}
	else
		task_id[ ap ] = TASK_PROGRAM;

	if( player_status == PLAYER_IDLING )
	{
		if( player_status != work6[ ap ] )
		{
			uv_rect[ ap ] = idling_seq[ 0 ];
			pos_x[ ap ] = 780 * WP;
			pos_y[ ap ] = 100 * WP;
			work7[ ap ] = idling_seq; 		
			work12[ ap ] = work7[ ap ].length;
			work9[ ap ] = 0;	// シーケンス管理用の変数をリセット
		}
		
		if( 0 < work11[ ap ] )
			work11[ ap ]--;
		else
		{	
			work9[ ap ]++;
			
			if( work12[ ap ] <= work9[ ap ] )	// シーケンスのラストまで来た
				work9[ ap ] = 1;
			
			switch( idling_seq[ work9[ ap ] ] )
			{
				case SEQ_WAIT:
					work9[ ap ]++;
					work11[ ap ] = idling_seq[ work9[ ap ] ];
					break;
				
				default:
					anime_no[ ap ] = idling_seq[ work9[ ap ] ];
					break;
			}
		}
	}
	
	work6[ ap ] = player_status;
}
function PLAYER_gomashio_idling_start()
{
	let ap;
	ap = TASK_start_GRP( PLAYER_gomashio_idling_exec, 5, TEXTURE_PLAYER_IDLING, player_idling_rect, 0, "アイドリング" );	
	pos_p[ ap ] = 150 * WP;
	
	work6[ ap ] 	= -1;	// 前フレームの状態を記憶しておく
	work7[ ap ] 	= -1;	// 使うシーケンスを保存
	work9[ ap ] 	= 0;	// シーケンス管理用	
	work11[ ap ]	= -1;	// wait時間をセット
	work12[ ap ] 	= -1;	// シーケンスの要素数
	
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;
	PLAYER_gomashio_dash_start();
}







//---------------------------------------------------------
//  ごましお滑り台
//---------------------------------------------------------
function PLAYER_gomashio_slide_exec( ap )
{
	let i;
	
	if( player_status == PLAYER_SLIDE )
		task_id[ ap ] = TASK_GRP;
	else
		task_id[ ap ] = TASK_PROGRAM;
	
	if( player_status == PLAYER_SLIDE )
	{
		if( player_status != work6[ ap ] )
		{
			uv_rect[ ap ] = slide_seq[ 0 ];
			pos_x[ ap ] = 850 * WP;
			pos_y[ ap ] = 125 * WP;
			work7[ ap ] = slide_seq; 		
			work12[ ap ] = work7[ ap ].length;
			work9[ ap ] = 0;	// シーケンス管理用の変数をリセット
		}
		
		
		if( 0 < work11[ ap ] )
			work11[ ap ]--;
		else
		{	
			work9[ ap ]++;
			
			if( work12[ ap ] <= work9[ ap ] )	// シーケンスのラストまで来た
			{	
				player_status = PLAYER_IDLING;
				task_id[ ap ] = TASK_PROGRAM;
			}
				
			switch( slide_seq[ work9[ ap ] ] )
			{
				case SEQ_WAIT:
					work9[ ap ]++;
					work11[ ap ] = slide_seq[ work9[ ap ] ];
					break;
				
				default:
					anime_no[ ap ] = slide_seq[ work9[ ap ] ];
					break;
			}
		}
	}
	
	work6[ ap ] = player_status;
}
function PLAYER_gomashio_slide_start()
{
	let ap;
	ap = TASK_start_GRP( PLAYER_gomashio_slide_exec, 5, TEXTURE_PLAYER_IDLING, player_slide_rect, 0, "滑り台" );	
	pos_p[ ap ] = 150 * WP;
	
	work6[ ap ] 	= -1;	// 前フレームの状態を記憶しておく
	work7[ ap ] 	= -1;	// 使うシーケンスを保存
	work9[ ap ] 	= 0;	// シーケンス管理用	
	work11[ ap ]	= -1;	// wait時間をセット
	work12[ ap ] 	= -1;	// シーケンスの要素数
}





//---------------------------------------------------------
//  ごましおダッシュ
//---------------------------------------------------------
function PLAYER_gomashio_dash_exec( ap )
{
	let i;
	
	if( player_status == PLAYER_DASH )
		task_id[ ap ] = TASK_GRP;
	else
		task_id[ ap ] = TASK_PROGRAM;
	
	if( player_status == PLAYER_DASH )
	{
		work2[ ap ]++;
		anime_no[ ap ] = work2[ ap ] % 2;
		
		if( player_status != work6[ ap ] )
		{
			pos_x[ ap ] = 780 * WP;
			pos_y[ ap ] = 100 * WP;
		}
		
		switch( work1[ ap ] )
		{
			case 0:
				pos_x[ ap ] += 15 * WP;
				if( 1140 * WP <= pos_x[ ap ] )
				{	
					uv_rect[ ap ] = player_dash_shita_rect;
					work1[ ap ]++;
				}
				break;
				
			case 1:
				pos_y[ ap ] += 15 * WP;
				if( 625 * WP <= pos_y[ ap ] )
				{	
					work1[ ap ]++;
					uv_rect[ ap ] = player_dash_yoko_rect;
					grp_mode[ ap ] = FLIP_LR;
				}
				break;
			
			case 2:
				pos_x[ ap ] -= 15 * WP;
				if( pos_x[ ap ] <= 150 * WP )
				{	
					uv_rect[ ap ] = player_dash_ue_rect;
					grp_mode[ ap ] &=~ FLIP_LR;
					work1[ ap ]++;
				}
				break;			
				
			case 3:
				pos_y[ ap ] -= 15 * WP;
				if( pos_y[ ap ] <= 90 * WP )
				{	
					uv_rect[ ap ] = player_dash_yoko_rect;
					pos_y[ ap ] = 90 * WP;
					work1[ ap ]++;
				}
				break;
				
			case 4:
				pos_x[ ap ] += 15 * WP;
				if( 780 * WP <= pos_x[ ap ] )
				{	
					work1[ ap ] = 0;
					work3[ ap ] = -1;
					pos_x[ ap ] = 780 * WP;
					task_id[ ap ] = TASK_PROGRAM;
					player_status = PLAYER_IDLING;
				}
				break;
		}
	}
	
	work6[ ap ] = player_status;
}
function PLAYER_gomashio_dash_start()
{
	let ap;
	ap = TASK_start_GRP( PLAYER_gomashio_dash_exec, 5, TEXTURE_PLAYER_IDLING, player_dash_yoko_rect, 0, "ダッシュ" );
	pos_p[ ap ] = 150 * WP;
	vec_x[ ap ] = 15 * WP;
	vec_y[ ap ] = 15 * WP;
	work8[ ap ] = vec_x[ ap ];
	work9[ ap ] = vec_y[ ap ];
	
	work1[ ap ] 	= 0;	// 遷移状態
	work2[ ap ] 	= 0;	// アニメナンバー管理用
	work3[ ap ] 	= -1;	// 行先を管理する
	work6[ ap ] 	= -1;	// 前フレームの状態を記憶しておく
}