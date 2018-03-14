//--------------------------------------------------------------------------------------
//短形データ
//--------------------------------------------------------------------------------------
const title_parts =
[
	[ 0, 0, 1280, 720, 1280/2, 720/2],
];

//--------------------------------------------------------------------------------------
//タイトル表示
//--------------------------------------------------------------------------------------
function TITLE_exec( ap )
{
	if( click_object == ap )
	{
		work1[ ap ] = 2;
	}
	switch( work1[ ap ] )
	{
		case 0:
			pos_y[ ap ] += 1 * WP;
			work2[ ap ]++;

			if( work2[ ap ] >= 30 )
			{
				work1[ ap ]++;
			}
			break;

		case 1:
			pos_y[ ap ] -= 1 * WP;
			work2[ ap ]--;

			if( work2[ ap ] <= 0 )
			{
				work1[ ap ]--;
			}
			break;

		case 2:
			base_color_a[ ap ] -= 10;

			if( base_color_a[ ap ] <= 0 )
			{
				TASK_end( ap );
				return;
			}
			break;
	}
}
function TITLE_start()
{
	let ap;
	console.log("タイトル初期化したよ。");

	ap = TASK_start_GRP( TITLE_exec, 3, TEXTURE_TITLE, title_parts, 0, "タイトル");
	pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
	pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
	pos_p[ ap ] = 100000 * WP;

	hit_x[ ap ] = -640;
	hit_y[ ap ] = -360;
	hit_w[ ap ] = 1280;
	hit_h[ ap ] = 720;

	base_color_a[ ap ] = 255;
	work1[ ap ] = 0;
	work2[ ap ] = 0;
}

