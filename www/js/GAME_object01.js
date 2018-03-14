



//--------------------------------------------------------------------------------------
//矩形データ
//--------------------------------------------------------------------------------------
let testuv_rect=
[
	[ 1440, 48, 112, 80, 112 / 2, 80 / 2 ],
	[ 1440, 176, 112, 80, 112 / 2, 80 / 2 ],

];

const kids_rect =
[
	[ 0, 0, 368, 432, 368 / 2, 432 / 2 ],
];

const door_rect = 
[
	[ 256, 0, 208, 128, 208 / 2, 128 / 2 ],
];

const news_paper_rect =
[
	[ 384, 128, 144, 256, 144 / 2, 256 / 2 - 50 ],
];

const closet_rect =
[
	[ 832, 0, 192, 336, 192 / 2, 336 / 2 ],
];

const bookshelt_rect  =
[
	[ 0 + 1, 336 + 1, 352 - 2, 192 - 2, ( 352 - 2 ) / 2, ( 192 - 2 ) / 2 ],
];





//--------------------------------------------------------------------------------------
//アニメーションさせる
//--------------------------------------------------------------------------------------
function OBJECT01_animation_control_Exec( ap )
{
	work4[ ap ]--;
	
}
function OBJECT01_Animation_control( actp, stop )
{
	let ap;
	//ap = TASK_start_GRP( OBJECT01_Animation_Control_Exec, 0, tex_no[ actp ], uv_rect[ actp ], 0, "テスト：ヘリ" );
	ap = TASK_start( OBJECT01_Animation_Control_Exec, GROUP_ANIME_CONTROL, "アニメーションを管理" );
	task_id[ ap ] = TASK_PROGRAM;
	work1[ ap ] = actp;	// 管理されるタスクのＩＤを記憶
	work2[ ap ] = stop;	// 矩形データの最後まで行ったときに管理を終わらせるかどうか
	work3[ ap ] = 0;	//タスクとしての進行度
	work4[ ap ] = 0;	//タイマー
}





//--------------------------------------------------------------------------------------
//テストオブジェクトの実行部例
//--------------------------------------------------------------------------------------

function OBJECT01_TEST_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" );
	}		
	
	
	
	switch( work3[ ap ] )
	{
		case 0:										//待機状態
			break;

		case 1:										//動く
			pos_x[ ap ] += 2 * WP;
			work1[ ap ]++;
			if( work1[ ap ] >= 60 )
			{
				work3[ ap ]++;
			}
			break;

		case 2:										//戻ってくる
			pos_x[ ap ] -= 2 * WP;
			work1[ ap ]--;
			if( work1[ ap ] <= 0 )
			{
				work3[ ap ] = 0;
			}
			break;
	}
	
	
}
function OBJECT01_TEST_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT01_TEST_exec, 4, TEXTURE_TESTOBJ, testuv_rect, 0, "テスト：ヘリ" );
	pos_x[ ap ] = 700 * WP;
	pos_y[ ap ] = 400 * WP;
	pos_p[ ap ] = 10000 * WP;
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}



//--------------------------------------------------------------------------------------
//ドア
//--------------------------------------------------------------------------------------
function OBJECT01_door_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" );
	}		
}
function OBJECT01_door_start()
{
	let ap;
	ap = TASK_start_GRP( OBJECT01_door_exec, 4, TEXTURE_ROOM_PARTS, door_rect, 0, "ドア" );
	pos_x[ ap ] = 640 * WP;
	pos_y[ ap ] =  62 * WP;
	pos_p[ ap ] = 200 * WP;
	
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;
	
	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}





//--------------------------------------------------------------------------------------
//新聞紙
//--------------------------------------------------------------------------------------
function OBJECT01_news_paper_exec( ap )
{
	if( click_object == ap && player_status == PLAYER_IDLING )
	{	
		//触れられた
		player_status = PLAYER_SLIDE;
		console.log( "___HIT!" );
	}		
}
function OBJECT01_news_paper_start()
{
	let ap;
	ap = TASK_start_GRP( OBJECT01_news_paper_exec, 4, TEXTURE_ROOM_PARTS, news_paper_rect, 0, "新聞紙" );
	pos_x[ ap ] = 950 * WP;
	pos_y[ ap ] = 200 * WP;
	pos_p[ ap ] = 130 * WP;
	
	hit_x[ ap ] = -64;
	hit_y[ ap ] = -64;
	hit_w[ ap ] = 110;
	hit_h[ ap ] = 150;
	
	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}




//--------------------------------------------------------------------------------------
//	クローゼット
//--------------------------------------------------------------------------------------
function OBJECT01_closet_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" );
	}		
}
function OBJECT01_closet_start()
{
	let ap;
	ap = TASK_start_GRP( OBJECT01_closet_exec, 4, TEXTURE_ROOM_PARTS, closet_rect, 0, "クローゼット" );
	pos_x[ ap ] = 1220 * WP;
	pos_y[ ap ] = 130  * WP;
	pos_p[ ap ] = 110 * WP;
	
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;
	
	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}




//--------------------------------------------------------------------------------------
//	本棚
//--------------------------------------------------------------------------------------
function OBJECT01_bookshelt_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" );
	}		
}
function OBJECT01_bookshelt_start()
{
	let ap;
	ap = TASK_start_GRP( OBJECT01_bookshelt_exec, 4, TEXTURE_ROOM_PARTS, bookshelt_rect, 0, "クローゼット" );
	pos_x[ ap ] = 520 * WP;
	pos_y[ ap ] = 640 * WP;
	pos_p[ ap ] = 240 * WP;
	
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;
	
	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}





//--------------------------------------------------------------------------------------
//	子供
//--------------------------------------------------------------------------------------
function OBJECT01_kids_exec( ap )
{
	
	if( work1[ ap ] == 0 )
	{
		scale_x[ ap ] -= 1;
		work2[ ap ]++;
		if( work2[ ap ] == 60 )
		{
			work2[ ap ] = 0;
			work1[ ap ] = 1;
		}
	}
	else
	{
		scale_x[ ap ] += 1;
		work2[ ap ]++;
		if( work2[ ap ] == 60 )
		{
			work2[ ap ] = 0;
			work1[ ap ] = 0;
		}
	}
	scale_y[ ap ] = scale_x[ ap ];

}
function OBJECT01_kids_start()
{
	let ap;
	ap = TASK_start_GRP( OBJECT01_kids_exec, 4, TEXTURE_KIDS, kids_rect, 0, "子供" );
	pos_x[ ap ] = 250 * WP;
	pos_y[ ap ] = 430 * WP;
	pos_p[ ap ] = 20000 * WP;
	
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;
	
	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用
}






