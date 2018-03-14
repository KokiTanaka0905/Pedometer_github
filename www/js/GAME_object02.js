





//--------------------------------------------------------------------------------------
//テストオブジェクト
//--------------------------------------------------------------------------------------
let gomashio_bed_on_rect=
[
	[    0,     0,     0,    0,     0,     0],					// 0
	[  896,   192,   112,    64,     0,    0],					// 1
	[ 1024,   192,   112,    64,     0,    0],
	[ 1152,   192,   112,    64,     0,    0],
	[ 1248,   192,    96,    64,     0,    0],
	[ 1344,   192,    96,    64,     0,    0],
	[ 1440,   192,    64,    80,     0,    0],
	[ 1504,   192,    64,    80,     0,    0],
	[ 1568,   192,    64,    80,     0,    0],
	[ 1632,   192,    64,    80,     0,    0],
	[ 1696,   192,    64,    48,     0,    0],					//10
	[ 1760,   192,    32,    64,     0,    0],					//11
	[ 1792,   192,    64,    80,     0,    0],
	[ 1856,   192,    48,    96,     0,    0],					//13

	[ 0,0,0,0,0,0],
	[ 0,0,0,0,0,0],
	[ 0,0,0,0,0,0],
	[ 0,0,0,0,0,0],
	[ 0,0,0,0,0,0],
	[ 0,0,0,0,0,0],
	[  896,   256,    32,    96,     0,    0],					//20
	[  928,   256,    32,   112,     0,    0],
	[  960,   256,    32,   112,     0,    0],
	[  992,   256,    64,    96,     0,    0],
	[ 1056,   256,    64,    96,     0,    0],
	[ 1120,   256,    64,    96,     0,    0],
];











//--------------------------------------------------------------------------------------
//テストオブジェクト
//--------------------------------------------------------------------------------------
let obj2uv_rect=
[
	[ 0, 0, 256, 256, 256 / 2, 256 / 2 ],				//0_台
	[ 256, 128, 112, 176, 112 / 2, 176 / 2 ],			//1_絵
	[ 528, 0, 112, 128, 112 / 2, 128 / 2 ],				//2_ハンガー
	[ 0, 528, 320, 496, 320 / 2, 496 / 2 ],				//3_ベッド
	[ 0, 0, 1280, 720, 0, 0 ],			//4_飛行機
];

















//--------------------------------------------------------------------------------------
//ベッドのごましお
//--------------------------------------------------------------------------------------
function OBJECT02_bed_gomashio2_exec( ap )
{
	switch( work3[ ap ] )
	{
		case 0:								//顔を出す。
			work1[ ap ]++;
			if( work1[ ap ] >= 4 )
			{
				work1[ ap ] = 0;
				anime_no[ ap ]++;
				if( anime_no[ ap ] == 25 )
				{
					work3[ ap ]++;
					work1[ ap ] = 0;
				}
			}
			break;

		case 1:								//最後は止まる。
			work1[ ap ]++;
			if( work1[ ap ] >= 90 )
			{
				TASK_end( ap );
				player_status = PLAYER_IDLING;
				return;
			}
			break;
			
	}
}
function OBJECT02_bed_gomashio2( x, y )
{
	ap = TASK_start_GRP( OBJECT02_bed_gomashio2_exec, 4, TEXTURE_PLAYER_IDLING, gomashio_bed_on_rect, 0, "ベッドのごましお" );
	task_delay[ ap ] = 46;
	pos_x[ ap ] = x;
	pos_y[ ap ] = y;
	pos_p[ ap ] = 93720 * WP;
	anime_no[ ap ] = 20;
	hit_x[ ap ] = -99999;
	hit_y[ ap ] = -99999;
	hit_w[ ap ] = 2;
	hit_h[ ap ] = 2;
	work1[ ap ] = 0;
}



//--------------------------------------------------------------------------------------
//ベッドのごましお
//--------------------------------------------------------------------------------------
function OBJECT02_bed_gomashio_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 && player_status == PLAYER_IDLING )
	{	
		//触れられた
		work3[ ap ] = 1;
		player_status = PLAYER_BED_ON;
		console.log( "___HIT!" + "____BED_GOMASHIO" );
	}		

	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			anime_no[ ap ] = 0;
			break;

		case 1:
			work1[ ap ]++;
			if( work1[ ap ] >= 4 )
			{
				work1[ ap ] = 0;
				anime_no[ ap ]++;
				if( anime_no[ ap ] == 14 )
				{
					OBJECT02_bed_gomashio2( 139 * WP, 240 * WP );
					work3[ ap ]++;
					work1[ ap ] = 0;
				}
			}
			break;
			
		case 2:
			work1[ ap ]++;
			if( work1[ ap ] == 60 )
			{
				work3[ ap ] = 0;
				work1[ ap ] = 0;
			}
			break;
	}



}
function OBJECT02_bed_gomashio( x, y )
{
	ap = TASK_start_GRP( OBJECT02_bed_gomashio_exec, 4, TEXTURE_PLAYER_IDLING, gomashio_bed_on_rect, 0, "ベッドのごましお" );
	pos_x[ ap ] = x;
	pos_y[ ap ] = y;
	pos_p[ ap ] = 720 * WP;
	hit_x[ ap ] = -20;
	hit_y[ ap ] = -20;
	hit_w[ ap ] = 84;
	hit_h[ ap ] = 84;
	work1[ ap ] = 0;
}





//--------------------------------------------------------------------------------------
//テーブルオブジェクト
//--------------------------------------------------------------------------------------
function OBJECT02_table_start()
{
	let ap;

	ap = TASK_start_GRP( NULL, 4, TEXTURE_ROOM_PARTS, obj2uv_rect, 0, "テーブル" );
	pos_x[ ap ] = 645 * WP;
	pos_y[ ap ] = 290 * WP;
	pos_p[ ap ] = 1220 * WP;

//	hit_x[ ap ] = -9999;
//	hit_y[ ap ] = -9999;
//	hit_w[ ap ] = 0;
//	hit_h[ ap ] = 0;

//	work1[ ap ] = 0;				//タイマー用
//	work2[ ap ] = 0;				//タイマー用2
//	work3[ ap ] = 0;				//進行度
}

//--------------------------------------------------------------------------------------
//ピクチャーオブジェクト
//--------------------------------------------------------------------------------------
function OBJECT02_picture_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" + "____PICTURE" );
	}		
	
	
	
	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			break;

		case 1:
			break;
	}
}
function OBJECT02_picture_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT02_picture_exec, 4, TEXTURE_ROOM_PARTS, obj2uv_rect, 1, "ピクチャー" );
	pos_x[ ap ] = 1200 * WP;
	pos_y[ ap ] = 470 * WP;
	pos_p[ ap ] = 120 * WP;
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}


//--------------------------------------------------------------------------------------
//ハンガーオブジェクト
//--------------------------------------------------------------------------------------
function OBJECT02_hanger_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" + "____HANGER" );
	}

	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			break;

		case 1:
			break;
	}		
}
function OBJECT02_hanger_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT02_hanger_exec, 4, TEXTURE_ROOM_PARTS, obj2uv_rect, 2, "ハンガー" );
	pos_x[ ap ] = 230 * WP;
	pos_y[ ap ] = 130 * WP;
	pos_p[ ap ] = 230 * WP;
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}



//--------------------------------------------------------------------------------------
//ベッドオブジェクト
//--------------------------------------------------------------------------------------
function OBJECT02_beddo_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" + "____BEDDO" );
	}		

	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			break;

		case 1:
			break;
	}
}
function OBJECT02_beddo_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT02_beddo_exec, 4, TEXTURE_ROOM_PARTS, obj2uv_rect, 3, "ベッド" );
	pos_x[ ap ] = 250 * WP;
	pos_y[ ap ] = 420 * WP;
	pos_p[ ap ] = 210 * WP;
	hit_x[ ap ] = -32;
	hit_y[ ap ] = -32;
	hit_w[ ap ] = 64;
	hit_h[ ap ] = 64;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}
























//--------------------------------------------------------------------------------------
//飛行機の残像を出す
//--------------------------------------------------------------------------------------

function OBJECT02_airplane_ill_exec( ap )
{
	base_color_a[ ap ] -= 25;
	if( base_color_a[ ap ] < 0 )
	{
		TASK_end( ap );
		return;
	}
}
function OBJECT02_airplane_ill( num )
{
	ap = TASK_start_GRP( OBJECT02_airplane_ill_exec, 4, num, obj2uv_rect, 4, "飛行機残像" );
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 0 * WP;
	pos_p[ ap ] = 84000 * WP;
	
	hit_x[ ap ] = -9999;
	hit_y[ ap ] = -9999;
	hit_w[ ap ] = -9999;
	hit_h[ ap ] = -9999;		
	
	base_color_a[ ap ] = 128;
}






//--------------------------------------------------------------------------------------
//飛行機オブジェクト
//--------------------------------------------------------------------------------------
function OBJECT02_airplane_exec( ap )
{
	if( click_object == ap && work3[ ap ] == 0 && player_status == PLAYER_IDLING )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" + "____AIRPLANE" );
	}		

	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			break;

		case 1:
			//ここで大量のファイルの読み込みを行う。
			for(i = 0; i <= 50; i++ )
				SOZ_Texture_Release( 100 + i );

			SOZ_Texture_Load( 100, "grp/airplane02.png" );
			SOZ_Texture_Load( 101, "grp/airplane03.png" );
			SOZ_Texture_Load( 102, "grp/airplane04.png" );
			SOZ_Texture_Load( 103, "grp/airplane05.png" );
			SOZ_Texture_Load( 104, "grp/airplane06.png" );
			SOZ_Texture_Load( 105, "grp/airplane07.png" );
			SOZ_Texture_Load( 106, "grp/airplane08.png" );
			SOZ_Texture_Load( 107, "grp/airplane09.png" );

			work3[ ap ]++;
			work1[ ap ] = 0;				//タイマー用
			work2[ ap ] = 0;				//タイマー用2
			break;


		case 2:
			work1[ ap ]--;
			if( work1[ ap ] <= 0 )
			{
				OBJECT02_airplane_ill( tex_no[ ap ] );
				tex_no[ ap ]++;
				if( tex_no[ ap ] >= 108 )
				{
					work2[ ap ]++;
					if( work2[ ap ] == 2 )
					{
						tex_no[ ap ] = TEXTURE_PLANE;
						work3[ ap ] = 0;
					}
					else
					{
						tex_no[ ap ] = 102;
					}
				}
				work1[ ap ] = 5;
			}
			break;



	}
}
function OBJECT02_airplane_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT02_airplane_exec, 4, TEXTURE_PLANE, obj2uv_rect, 4, "飛行機" );
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 0 * WP;
	pos_p[ ap ] = 80000 * WP;
	hit_x[ ap ] = 1076;
	hit_y[ ap ] = 556;
	hit_w[ ap ] = 48;
	hit_h[ ap ] = 48;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
}













//--------------------------------------------------------------------------------------
//洗濯物干し
//--------------------------------------------------------------------------------------
function OBJECT02_line_exec( ap )
{
	let waitbox = [ 20, 6, 5, 4, 4, 6, 20, 6, 6, 6, 6];
	if( click_object == ap && work3[ ap ] == 0 && player_status == PLAYER_IDLING )
	{	
		//触れられた
		work3[ ap ] = 1;
		console.log( "___HIT!" + "____LINE" );
	}		

	switch( work3[ ap ] )
	{
		case 0:					//待機状態
			break;

		case 1:
			player_status = PLAYER_LINE;


			//ここで大量のファイルの読み込みを行う。
			for(i = 0; i <= 50; i++ )
				SOZ_Texture_Release( 100 + i );

			SOZ_Texture_Load( 100, "grp/line_1.png" );
			SOZ_Texture_Load( 101, "grp/line_2.png" );
			SOZ_Texture_Load( 102, "grp/line_3.png" );
			SOZ_Texture_Load( 103, "grp/line_4.png" );
			SOZ_Texture_Load( 104, "grp/line_5.png" );
			SOZ_Texture_Load( 105, "grp/line_6.png" );
			SOZ_Texture_Load( 106, "grp/line_7.png" );
			tex_no[ ap ] = 100;

			work3[ ap ]++;
			work1[ ap ] = 0;				//タイマー用
			work2[ ap ] = 0;				//タイマー用2
			break;


		case 2:
			work1[ ap ]++;
			if( work1[ ap ] >= waitbox[ work2[ ap ] ] )
			{
				work1[ ap ] = 0;
				work2[ ap ]++;
				tex_no[ ap ]++;
				if( tex_no[ ap ] >= 107 )
				{
					tex_no[ ap ] = TEXTURE_LINE;
					work3[ ap ] = 0;
					player_status = PLAYER_IDLING;
				}
			}
			break;



	}
}
function OBJECT02_line_start()
{
	let ap;

	ap = TASK_start_GRP( OBJECT02_line_exec, 4, TEXTURE_LINE, obj2uv_rect, 4, "洗濯物干し" );
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 0 * WP;
	pos_p[ ap ] = 60000 * WP;
	hit_x[ ap ] = 0;
	hit_y[ ap ] = 0;
	hit_w[ ap ] = 128;
	hit_h[ ap ] = 128;

	work1[ ap ] = 0;				//タイマー用
	work2[ ap ] = 0;				//タイマー用2
	work3[ ap ] = 0;				//進行度
	
}


