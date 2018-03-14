





//--------------------------------------------------------------------------------------
//部屋矩形
//--------------------------------------------------------------------------------------
let room_uv = 
[
	[ 0, 0, 1280, 720, 0, 0 ],
];


//--------------------------------------------------------------------------------------
//部屋背景
//--------------------------------------------------------------------------------------
function ROOM_bg_start()
{
	let ap;
	
	ap = TASK_start_GRP( NULL, 4, TEXTURE_BG, room_uv, 0, "部屋のペース画像" );
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 0 * WP;
	pos_p[ ap ] = -99999 * WP;
}





//--------------------------------------------------------------------------------------
//初期状態を作り出す
//--------------------------------------------------------------------------------------
function ROOM_1st_start()
{
	ROOM_bg_start();
	OBJECT01_door_start();
	
	OBJECT01_news_paper_start();
	PLAYER_gomashio_slide_start();
	
	OBJECT01_closet_start();
	OBJECT01_bookshelt_start();
	OBJECT01_kids_start();
	

	OBJECT02_table_start();
	//OBJECT02_picture_start();
	OBJECT02_airplane_start();
	OBJECT02_beddo_start();
	OBJECT02_hanger_start();
	OBJECT02_line_start();
	OBJECT02_bed_gomashio( 290 * WP, 220 * WP );



	
}



