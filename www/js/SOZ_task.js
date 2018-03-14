//---------------------------------------------------------
//  SystemOZ for HTML5
//
//				レンダリングプログラム
//
//									  programed by R-TOHYA
//---------------------------------------------------------








//---------------------------------------------------------
//  定数的なもの
//---------------------------------------------------------
const TASK_MAX = 1600;												//タスクの数の最大値
const X = 0, Y = 1, Z = 2, P = 3, D = 4, E = 5;
const XY = 2, XYZ = 3, XYZP = 4, XYZPDE = 6, WP = 4096;
const TASK_SLEEP = 0,TASK_PROGRAM = 1, TASK_GRP = 2, TASK_FONT = 3;	//制御プログラム
let 	task_next = -1;



//---------------------------------------------------------
//  タスクメンバ
//---------------------------------------------------------
//残念なことにHTML5には構造体的なものはないので別々に作るしかない。
let	task_id 		= [TASK_MAX];

let	task_name 		= [TASK_MAX];
let	parent 			= [TASK_MAX];
let	child 			= [TASK_MAX];
let	child2 			= [TASK_MAX];
let	child3 			= [TASK_MAX];
let	child4 			= [TASK_MAX];

let	callback 		= [TASK_MAX];
let	task_status 	= [TASK_MAX];		//タスクのグループ
let	task_group 		= [TASK_MAX];		//タスクのグループ
let	task_execfunc 	= [TASK_MAX];		//実行する関数
let	task_delay 		= [TASK_MAX];		//実行する関数
let	exec_pri 		= [TASK_MAX];		//実行優先順位

let	grp_mode 		= [TASK_MAX];		//タスクのグループ
let	draw_func 		= [TASK_MAX];
let	tex_no 			= [TASK_MAX];		//表示するテクスチャ
let	anime_no	 	= [TASK_MAX];		//表示するアニメナンバー					
let	blend_type 		= [TASK_MAX];		//重ね合わせ合成色具合
let	base_color_a 	= [TASK_MAX];		//表示の透明度具合
let base_color_r	= [TASK_MAX];		//フォントの色
let base_color_g	= [TASK_MAX];		//フォントの色	
let	base_color_b	= [TASK_MAX];		//フォントの色


let	uv_rect 		= [TASK_MAX];				//矩形データ
let	pos_x			= [TASK_MAX];		//座標
let	pos_y			= [TASK_MAX];		//座標
let	pos_z			= [TASK_MAX];		//座標
let	pos_p			= [TASK_MAX];		//座標
let	scale_x			= [TASK_MAX];		//拡大サイズ
let	scale_y			= [TASK_MAX];		//拡大サイズ
let	vec_x			= [TASK_MAX];
let	vec_y			= [TASK_MAX];
let	acc_x			= [TASK_MAX];
let	acc_y			= [TASK_MAX];
let	cen_x			= [TASK_MAX];
let	cen_y			= [TASK_MAX];
let	str 			= [TASK_MAX];		//文字列格納エリア
let	str_align		= [TASK_MAX];		//文字列アライン
let	font_name		= [TASK_MAX];		//フォント名を入れる
let	font_size		= [TASK_MAX];		//フォントサイズ
let	work1			= [TASK_MAX];		//ワークエリア
let	work2			= [TASK_MAX];
let	work3			= [TASK_MAX];
let	work4			= [TASK_MAX];
let	work5			= [TASK_MAX];
let	work6			= [TASK_MAX];
let	work7			= [TASK_MAX];
let	work8			= [TASK_MAX];
let	work9			= [TASK_MAX];
let	work10			= [TASK_MAX];
let	work11			= [TASK_MAX];
let	work12			= [TASK_MAX];
let	work13			= [TASK_MAX];
let	work14			= [TASK_MAX];
let	work15			= [TASK_MAX];
let	work16			= [TASK_MAX];

let	work1x			= [TASK_MAX];		//ワークエリア
let	work1y			= [TASK_MAX];		//ワークエリア
let	work1z			= [TASK_MAX];		//ワークエリア
let	work1p			= [TASK_MAX];		//ワークエリア
let	work2x			= [TASK_MAX];
let	work2y			= [TASK_MAX];
let	work2z			= [TASK_MAX];
let	work2p			= [TASK_MAX];
let	work3x			= [TASK_MAX];
let	work3y			= [TASK_MAX];
let	work3z			= [TASK_MAX];
let	work3p			= [TASK_MAX];

let	ang_x			= [TASK_MAX];
let	ang_y			= [TASK_MAX];
let	ang_z			= [TASK_MAX];
let	angle_x			= [TASK_MAX];
let	angle_y			= [TASK_MAX];
let	angle_z			= [TASK_MAX];
let	hit_x 			= [TASK_MAX];
let	hit_y 			= [TASK_MAX];
let	hit_w 			= [TASK_MAX];
let	hit_h 			= [TASK_MAX];

let	keep_x 			= [TASK_MAX];
let	keep_y 			= [TASK_MAX];
let	keep_spd		= [TASK_MAX];






//---------------------------------------------------------
//  グラフィックモード
//---------------------------------------------------------
const FLIP_UD 			= 0x00000001
const FLIP_LR			= 0x00000002
const RECT_SMALL		= 0x00000004
const USE_3D_POS		= 0x00000010



//---------------------------------------------------------
//  ポーズステータス
//---------------------------------------------------------
const STATUS_NORMAL = 0;
const STATUS_PAUSE 	= 1;
const STATUS_HIDDEN	= 2;


//---------------------------------------------------------
//  マップパーツのアトリビュート
//---------------------------------------------------------
const MAP_FLIP_LR			= 	( 1 << 0 );
const MAP_FLIP_UD			=	( 1 << 1 );


//---------------------------------------------------------
//  NULLの設定
//---------------------------------------------------------
const NULL					= 0;




//---------------------------------------------------------
//  フラグ状態をチェックする
//---------------------------------------------------------
function tstFLG( data, flag )	
{
	return (( data ) &  ( flag ));
}



//---------------------------------------------------------
//  フラグ状態をチェックする
//---------------------------------------------------------
function setFLG( data, flag )	
{
	return (( data ) |  ( flag ));
}

//---------------------------------------------------------
//  フラグ状態をチェックする
//---------------------------------------------------------
function clrFLG( data, flag )	
{
	return (( data ) &  ~( flag ));
}




//---------------------------------------------------------
//  タスクの実行
//---------------------------------------------------------
function TASK_exec()
{
	let id, i, exec_cnt = 0, num;

	for( id = 0; id < TASK_MAX; id++)				//タスクの個数分ループ
	{

		if( task_status[ id ] == STATUS_NORMAL && task_id[ id ] != TASK_SLEEP )			//実行関数がある？
		{
			num = task_delay[ id ];
			if( num >= 1 )
				task_delay[ id ]--;
			
			if( task_execfunc[ id ] != NULL && num == 0 )			//実行関数がある？
			{
				task_execfunc[ id ]( id );
			}				
			exec_cnt++;
		}
	}


	if( exec_cnt > TASK_MAX )
	{
		console.log( "TASK_over" );
	}
}



//---------------------------------------------------------
//  タスクの初期化
//---------------------------------------------------------
function TASK_init( id )
{
	task_name[ id ] = "";
	task_group[ id ] = 0;					//タスクのグループ
	task_status[ id ] = STATUS_NORMAL;
	task_delay[ id ] = 0;
	draw_func[ id ] = -1;
	grp_mode[ id ] = 0;
	parent[ id ] = -1;
	child[ id ] = -1;
	child2[ id ] = -1;
	child3[ id ] = -1;
	child4[ id ] = -1;
	task_execfunc[ id ] = 0;			//実行する関数
	callback[ id ] = 0;

	tex_no[ id ] = 0;			//表示するテクスチャ
	anime_no[ id ] = 0;			//表示するアニメナンバー					
	uv_rect [ id ] = 0;				//矩形データ
	exec_pri[ id ] = 16;		//眠らせる
	pos_x[ id ]= 0;				//座標
	pos_y[ id ]= 0;				//座標
	pos_z[ id ]= 0;				//座標
	scale_x[ id ] = WP;				//拡大サイズ
	scale_y[ id ] = WP;				//拡大サイズ
	str[ id ] = "";					//文字列格納エリア
	str_align[ id ]	= "start";
	font_name[ id ] = " ";
	font_size[ id ] = 16;

	blend_type[ id ] = BLEND_NORMAL;
	base_color_a[ id ] = 255;	
	base_color_r[ id ] = 255;
	base_color_g[ id ] = 255;
	base_color_b[ id ] = 255;

	work1[ id ] = 0;				//ワークエリア
	work2[ id ] = 0;
	work3[ id ] = 0;
	work4[ id ] = 0;
	work5[ id ] = 0;
	work6[ id ] = 0;
	work7[ id ] = 0;
	work8[ id ] = 0;
	work9[ id ] = 0;
	work10[ id ] = 0;				//ワークエリア
	work11[ id ] = 0;				//ワークエリア
	work12[ id ] = 0;
	work13[ id ] = 0;
	work14[ id ] = 0;
	work15[ id ] = 0;
	work16[ id ] = 0;
	ang_x[ id ] = 0;
	ang_y[ id ] = 0;

	ang_z[ id ] = 0;
	
	keep_x[ id ]  = 0;
	keep_y[ id ]  = 0;
	keep_spd[ id ] = 1;

	hit_x[ id ] = -999;
	hit_y[ id ] = -999;
	hit_w[ id ] = -999;
	hit_h[ id ] = -999;

	task_id[ id ] = TASK_SLEEP;				//眠らせる

}



//---------------------------------------------------------
//  全タスクの初期化
//---------------------------------------------------------
function TASK_all_init( )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
		TASK_init( i );
}


//---------------------------------------------------------
//  タスクの終了
//---------------------------------------------------------
function TASK_end( ap )
{
	TASK_init( ap );
	task_next = ap;			//空くわけだし確実か
}



//---------------------------------------------------------
//  全タスクの指定グループの初期化
//---------------------------------------------------------
function TASK_end_group( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] == t_group && task_id[ i ] != TASK_SLEEP )
			TASK_end( i );
	}
}























//---------------------------------------------------------
//  指定タスクグループのポーズ
//---------------------------------------------------------
function TASK_pause( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] == t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_PAUSE;
	}
}

//---------------------------------------------------------
//  指定グループタスクのポーズ
//---------------------------------------------------------
function TASK_pause_gt( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] >= t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_PAUSE;
	}
}






//---------------------------------------------------------
//  指定タスクグループの非表示
//---------------------------------------------------------
function TASK_hidden( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] == t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_HIDDEN;
	}
}

//---------------------------------------------------------
//  指定グループのタスクの非表示
//---------------------------------------------------------
function TASK_hidden_gt( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] >= t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_HIDDEN;
	}
}


//---------------------------------------------------------
//  指定タスクグループのポーズ解除
//---------------------------------------------------------
function TASK_pause_end( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] == t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_NORMAL;
	}
}

function TASK_pause_end_gt( t_group )
{
	let i;

	for(i = 0; i < TASK_MAX; i++ )
	{
		if( task_group[ i ] >= t_group && task_id[ i ] != TASK_SLEEP )
			task_status[ i ] = STATUS_NORMAL;
	}
}

















//---------------------------------------------------------
//  空きタスクの検索
//---------------------------------------------------------
function TASK_found( )
{
	let ret, i;
	
	ret = TASK_MAX + 1;
	
	if( task_next <= -1 || 	task_next >= TASK_MAX )
	{
		for(i = 0; i < TASK_MAX; i++ )
		{
			if( task_id[ i ] == TASK_SLEEP )
			{
				ret = i;
				task_next = -1;

				i = TASK_MAX + 10000;
			}
		}
	}	
	else
	{
		ret = task_next;
		task_next = -1;
	}


	if( i != TASK_MAX - 1 )
		if( task_id[ ret + 1 ] == TASK_SLEEP )
			task_next = ret + 1;

	if( i != 0 )
		if( task_id[ ret - 1 ] == TASK_SLEEP )
			task_next = ret - 1;


	return ret;
}




//---------------------------------------------------------
//  タスクの生成
//---------------------------------------------------------
function TASK_start( exec_func, group, string )
{
	let id;
	TASK_init( id );
	id = TASK_found( );
	TASK_init( id );
	task_id[ id ] = TASK_GRP;				//実行内容
	task_name[ id ] = string;				//実行内容
	task_execfunc[ id ] = exec_func;		//実行関数
	task_group[ id ] = group;			//グループ設定
	return id;
}



//---------------------------------------------------------
// タスクの発生をグラフィック
//---------------------------------------------------------
function TASK_start_GRP( func, group, tex_num, rect, anm_no, debug_mes )
{
	let ap;
	
	ap = TASK_start( func, group, debug_mes );
	tex_no[ ap ] 	= tex_num;
	uv_rect[ ap ]	= rect;
	anime_no[ ap ] 		= anm_no;

	return ap;
}



//---------------------------------------------------------
// タスクの発生をグラフィック
//---------------------------------------------------------
function TASK_start_FONT( func, group, mes, fontname, fontsize )
{
	let ap;
	
	ap = TASK_start( func, group, mes );
	task_id[ ap ]	= TASK_FONT;
	str[ ap ] = mes;
	font_name[ ap ] = fontname; 
	font_size[ ap ] = fontsize; 
	return ap;
}







//---------------------------------------------------------
//  乱数生成関数
//---------------------------------------------------------
function Rand2( min, max )
{
	let tmp;
	
	if( min > max )
	{
		tmp = max;
		max = min;
		min = tmp;
	}	

	if( max == min )
	{
		return max;
	}
	
	return Math.floor( min + Math.random() * ( max - min ) );
}








