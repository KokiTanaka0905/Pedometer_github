



//--------------------------------------------------------------------------------------
//	メッセージ
//--------------------------------------------------------------------------------------
let mes_uv =
[
	[ 0, 0, 512, 64, 512, 64 ],
	[ 0, 128, 512, 64, 512, 64 ],
	[ 0, 64, 512, 64, 512, 64 ],
];




//--------------------------------------------------------------------------------------
//	オープニングメッセージ
//--------------------------------------------------------------------------------------
function OPENING_message_exec( ap )
{
	pos_x[ ap ] += WP / 2;
	work1[ ap ] ++;
	if( work1[ ap ] >= 120 )
	{
		base_color_a[ ap ] -= 10;		
		if( base_color_a[ ap ] <= 10 )
		{
			TASK_end( ap );
			return;
		}
	}
}


//--------------------------------------------------------------------------------------
//	オープニング画像処理
//--------------------------------------------------------------------------------------
function OPENING_grp_out_exec( ap )
{
	if( work4[ ap ] == 1 )
	{
		base_color_a[ ap ] += 20;
		if(base_color_a[ ap ] >= 255 )
		{
			base_color_a[ ap ] = 255;
			work4[ ap ] = 0;
		}
	}
	
	
	pos_p[ ap ]++;
	work1[ ap ]++;
	if( work1[ ap ] >= 180 )
	{
		base_color_a[ ap ] -= 5;		
		if( base_color_a[ ap ] <= 10 )
		{
			TASK_end( ap );
			return;
		}
	}
	
}
function OPENING_grp_out( id )
{
	ap = TASK_start_GRP( OPENING_grp_out_exec, 4, TEXTURE_OPEN1 + id, room_uv, 0, "オープニング画像" );
	pos_x[ ap ] = 0 * WP;
	pos_y[ ap ] = 0 * WP;
	pos_p[ ap ] = 99900 * WP;	
	work1[ ap ] = 0;
	if( id == 0 )
	{
		work4[ ap ] = 1;
		base_color_a[ ap ] = 0;
	}

	ap = TASK_start_GRP( OPENING_message_exec, 4, TEXTURE_OPENMES, mes_uv, id, "オープニング画像メッセージ" );
	task_delay[ ap ] = 50;
	pos_p[ ap ] = 99990 * WP;	

	switch( id )
	{
		case 0:
			pos_x[ ap ] = 1000 * WP;
			pos_y[ ap ] = 700 * WP;
			break;
				
		case 1:
			pos_x[ ap ] = 1200 * WP;
			pos_y[ ap ] = 700 * WP;
			break;	

		case 2:
			pos_x[ ap ] = 900 * WP;
			pos_y[ ap ] = 700 * WP;
			break;	
	}
}




