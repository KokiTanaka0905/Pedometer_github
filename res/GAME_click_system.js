





//--------------------------------------------------------------------------------------
//画面に出ている全タスクの中から、指定座標にあるアイテムをもらってくる
//--------------------------------------------------------------------------------------
function CLICK_click_obj( click_x, click_y)
{
	let ap = -1, x, y, x2, y2;
	let max_pri = -99999 * WP;

	for(i = 0; i < TASK_MAX; i++)
	{
		if( task_id[ i ] == TASK_GRP && max_pri <= pos_p[ i ] ) 				
		{
			x = pos_x[ i ] / WP + hit_x[ i ];
			y = pos_y[ i ] / WP + hit_y[ i ];
			x2 = x + hit_w[ i ];
			y2 = y + hit_h[ i ];
//			console.log( " " + i +  " " + x +  " " + y +  " " + x2 +  " " + y2 );
			if( click_x >= x && click_y >= y && click_x <= x2 && click_y <= y2 )
			{
//				console.log( "HIT!" );
				ap = i;
				max_pri	= pos_p[ i ];	
			}
		}
	}

	return ap;
}



