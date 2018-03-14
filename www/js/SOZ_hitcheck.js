

//---------------------------------------------------------
//  矩形同士のチェック
//---------------------------------------------------------
function hitcheck_core( ap, ap2 )
{
	let x,y,w,h;
	let x2,y2,w2,h2;
	let	scl_x, scl_y, scl_x2, scl_y2;
	let swp, chk_y;


	

	x = hit_x[ ap ];
	y = hit_y[ ap ];
	w = hit_x[ ap ] + hit_w[ ap ];
	h = hit_y[ ap ] + hit_h[ ap ];

	x2 = hit_x[ ap2 ];
	y2 = hit_y[ ap2 ];
	w2 = hit_x[ ap2 ] + hit_w[ ap2 ];
	h2 = hit_y[ ap2 ] + hit_h[ ap2 ];

	if( x == -999 || x2 == -999 )				//使用できない矩形ではないかを確認
		return 0;

	if( y == -999 || y2 == -999 )
		return 0;


	
	//実際の当たり判定座標を作る

	scl_x = scale_x[ ap ] / WP;				//拡大率
	scl_y = scale_y[ ap ] / WP;				
	scl_x2 = scale_x[ ap2 ] / WP;				//拡大率
	scl_y2 = scale_y[ ap2 ] / WP;				




	if( tstFLG( grp_mode[ ap ], FLIP_LR ) )			//左右反転があった場合の処理。
	{
		x = -x;		w = -w;
		if( x > w )
		{
			swp = x;	x = w;	x = swp;
		}
	}

	if( tstFLG( grp_mode[ ap ], FLIP_UD ) )			//上下反転があった場合の処理
	{
		y = -y;		h = -h;
		if( y > h )
		{
			swp = y;	y = h;	y = swp;
		}
	}

	if( tstFLG( grp_mode[ ap2 ], FLIP_LR ) )			//左右反転があった場合の処理。
	{
		x2 = -x2;		w2 = -w2;
		if( x2 > w2 )
		{
			swp = x2;	x2 = w;	x2 = swp;
		}
	}

	if( tstFLG( grp_mode[ ap2 ], FLIP_UD ) )			//上下反転があった場合の処理
	{
		y2 = -y2;		h2 = -h2;
		if( y > h )
		{
			swp = y2;	y = h2;	y2 = swp;
		}
	}


	x = pos_x[ ap ] / WP +  x * scl_x;						//拡大率も考慮して当たり判定の位置を計算
	y = pos_y[ ap ] / WP +  y * scl_y;
	w = pos_x[ ap ] / WP +  w * scl_x;
	h = pos_y[ ap ] / WP +  h * scl_y;
	x2 = pos_x[ ap2 ] / WP +  x2 * scl_x2;
	y2 = pos_y[ ap2 ] / WP +  y2 * scl_y2;
	w2 = pos_x[ ap2 ] / WP +  w2 * scl_x2;
	h2 = pos_y[ ap2 ] / WP +  h2 * scl_y2;

/*
	if( tstFLG( ap->grp_mode , USE_3D_POS ) )										//3D座標系になっている場合は、更に当たり判定が計算される
	{
		fwx = (FLOAT)x;
		fwy = (FLOAT)y2;
		SOZ_get3Dpos( &fwx, &fwy, actp->pos[Z], actp->pos_shift[X], actp->pos_shift[Y] );
		x = (SINT32)fwx;
		y2 = (SINT32)fwy;

		fwx = (FLOAT)w;
		fwy = (FLOAT)h;
		SOZ_get3Dpos( &fwx, &fwy, actp->pos[Z], actp->pos_shift[X], actp->pos_shift[Y] );
		w = (SINT32)fwx;
		h = (SINT32)fwy;

		fwx = (FLOAT)x2;
		fwy = (FLOAT)y2;
		SOZ_get3Dpos( &fwx, &fwy, actp->pos[Z], actp->pos_shift[X], actp->pos_shift[Y] );
		x2 = (SINT32)fwx;
		y2 = (SINT32)fwy;

		fwx = (FLOAT)w2;
		fwy = (FLOAT)h2;
		SOZ_get3Dpos( &fwx, &fwy, ap->pos[Z], ap->pos_shift[X], ap->pos_shift[Y] );
		w2 = (SINT32)fwx;
		h2 = (SINT32)fwy;
	}
*/

	//実際のチェックを行う。
	chk_y = 0;
	if( ( y <= h2 && h >= h2) || ( y <= y2 && h >= y2) )
		chk_y = 1;

	//1,3
	if( (x <= w2 && w >= w2) && chk_y ) 
		return 1;

	//2,4
	if( (x <= x2 && w >= x2) && chk_y )
		return 1;

	//5 欠番
	
	
	//6
	if( x >= x2 && y >= y2 && w <= w2 && h <= h2 )
		return 1;

	//7
	if( y >= y2 && h <= h2 )
	{
		if( x <= x2 && w >= x2 )
			return 1;
		if( x <= w2 && w >= w2 )
			return 1;
	}
	
	//8
	if( x >= x2 && w <= w2 )
	{
		if( y <= y2 && h >= y2 )
			return 1;
		if( y <= h2 && h >= h2 )
			return 1;
	}

	
	return 0;
}




//---------------------------------------------------------
//  与えられた物体の当たり判定をチェックする
//	呼ぶのは自機、自機の弾、ボムのみ
//---------------------------------------------------------
function hitcheck_exec( ap )
{
	let i;
	let chk1 = -1, chk2 = -1, chk3 = -1;
	let hit = 0;

	switch( task_group[ ap ] )
	{
		case GROUP_MYSHIP:
			chk1 = GROUP_ENEMY;
			chk2 = GROUP_ENEMY_BALETTE;
			break;

		case GROUP_MYSHIP_BALETTE:
			chk1 = GROUP_ENEMY;
			break;

		case GROUP_BOMB:
			chk1 = GROUP_ENEMY;
			chk2 = GROUP_ENEMY_BALETTE;
			break;
	}


	
	for( i = 0; i < TASK_MAX; i++ )
	{
		if( i != ap && task_id[ i ] != TASK_SLEEP )
		{
			if( chk1 == task_group[ i ] || chk2 == task_group[ i ] || chk3 == task_group[ i ] )
			{
				hit = hitcheck_core( ap, i );
				if( hit != 0 )
					return i;
			}
		}
	}
	

	return -1;
}



