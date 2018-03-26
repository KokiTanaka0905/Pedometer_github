//--------------------------------------------------------------------------------------
//
//  ゲームのメインとなるキャラクターの制御
//
//--------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------
//  定数定義のようなもの
//--------------------------------------------------------------------------------------





//--------------------------------------------------------------------------------------
//  外部変数
//--------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------
//矩形データ
//--------------------------------------------------------------------------------------








//---------------------------------------------------------
//  キャラクターを表示
//---------------------------------------------------------
function PLAYER_character_exec( ap )
{
    scale_x[ ap ] = work5[ ap ] + SOZ_get_SIN( ang_x[ ap ] ) * work3[ ap ];
    scale_y[ ap ] = work5[ ap ] + SOZ_get_COS( ang_x[ ap ] ) * work3[ ap ];
    ang_x[ ap ] += 0x800;
    
    switch( work2[ ap ] )
    {
    	case 0:
			if( Rand2( 0, 100 ) == 0 )
				work2[ ap ] = 1;		//モーションさせる
			break;

		case 1:
			work3[ ap ] += WP / 200;
			if( work3[ ap ] >= WP / 6 )
				work2[ ap ] =2;
			break;

		case 2:
			work3[ ap ] -= WP / 200;
			if( work3[ ap ] <= 0 * WP )
			{
				work3[ ap ] = 0;
				work2[ ap ] = 0;
			}
			break;
	}
    
    switch( work6[ ap ] )   // 移動管理用
    {
        case 0:
            vec_x[ ap ] = Rand2( - 1, 2 ) * WP;
            work7[ ap ] = Rand2( 60, 60 * 3 );
            work6[ ap ]++;
            break;
        
        case 1:
            work7[ ap ]--;
            pos_x[ ap ] += vec_x[ ap ];
            
            if( work7[ ap ] <= 0 ) 
                work6[ ap ]--;
                
            if( pos_x[ ap ] <= 0 )
            {
                vec_x[ ap ] = WP;    
                work7[ ap ] = Rand2( 60, 60 * 3 );
            }    
                
            if( WINDOW_WIDTH * WP <= pos_x[ ap ] )
            {
                vec_x[ ap ] = - WP;
                work7[ ap ] = Rand2( 60, 60 * 3 );
            }    
            break;
    }
}
function PLAYER_character_start()
{
    let i;
    let ap;
    let tex = 150 + step_number_table[ how_many_day ][ 1 ];
    let gn = "grp/";
    gn += step_number_table[ how_many_day ][ 1 ].toString(16);
    gn += ".png";
    
    SOZ_Texture_Load( tex, gn );
    
    ap = TASK_start_GRP( PLAYER_character_exec, 0, tex, uv512_512_rect, 0, "キャラクター本体" );
    
    pos_x[ ap ] = WINDOW_WIDTH / 2 * WP;
    pos_y[ ap ] = WINDOW_HEIGHT / 2 * WP;
    pos_p[ ap ] = 200 * WP;
    scale_x[ ap ] = WP / 2;
    scale_y[ ap ] = scale_x[ ap ];
    work5[ ap ] = WP / 2;
    work6[ ap ] = 0;
}
