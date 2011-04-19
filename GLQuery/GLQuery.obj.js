var fnc_process_str = function( str_obj )
{
	var str_obj = str_obj.replace( "\r", '' );
	var arr_rows = str_obj.split( "\n" );
	var length = arr_rows.length;
	
	var arr_vertices = [];
	var arr_uvs = [];
	
	var arr_polygon_vertices = [];
	var arr_polygon_uvs = [];

	
	for ( i = 0; i < length; i++ )
	{
		var str_row = arr_rows[ i ];
		if ( str_row === undefined ) continue;
		if ( str_row.length === 0 ) continue;
		
		var str_val = str_row.substr( 0, 2 );

		/**/
		if ( str_val == 'v ' )
		{
			var arr_cells = str_row.split( ' ' );
			
		
			
			arr_vertices.push( [
			arr_cells[ 1 ]
			,	arr_cells[ 2 ]
			,	arr_cells[ 3 ]
			] );
			
			
		}
		
		/** Processing UV coordinates */
		if ( str_val === 'vt' )
		{
			var arr_cells = str_row.split( ' ' );
			arr_uvs.push( [
			arr_cells[ 1 ] //U
			,	arr_cells[ 2 ] //V
			] );
		}
		/** Processing */
		if ( str_val == 'f ' )
		{
			
			var arr_polygon_vertex = [];
			var arr_polygon_uv = [];
			
			var arr_cells = str_row.split( ' ' );
			arr_int_vertices = [];
			for ( j in arr_cells )
			{
				var int_vertex;
				var int_uv;
				
				if ( j == 0 ) continue;
				
				int_index_of_slash = arr_cells[ j ].indexOf( '/' );

				if ( int_index_of_slash == -1 )
				{
					int_vertex = arr_cells[ j ] * 1;
				}
				else
				{
					//int_vertex = arr_cells[ j ].substr( 0, arr_cells[ j ].indexOf( '/' ) ) * 1;
					var arr_mixed = arr_cells[ j ].split( '/' );
					int_vertex = arr_mixed[ 0 ];
					int_uv = arr_mixed[ 1 ];
					//console.log( int_vertex );
				}
		
				//arr_polygon_vertex.push( arr_vertices[ int_vertex - 1] );
				arr_polygon_vertex.push( int_vertex - 1 );
				arr_polygon_uv.push( int_uv - 1 );
			}
			
			arr_polygon_vertices.push( arr_polygon_vertex ); 
			arr_polygon_uvs.push( arr_polygon_uv ); 
		}
		/**/
	}
	return {
		'arr_vertices' : arr_vertices
	,	'arr_polygon_vertices' : arr_polygon_vertices
	,	'arr_polygon_uvs' : arr_polygon_uvs
	,	'arr_uvs' : arr_uvs
	};
}


var Obj_from_str = function ( str )
{
	var factor = 1;
	var scope = this;

	THREE.Geometry.call( this );
	var res = fnc_process_str.call( this, str );
	var int_count_vertices = res.arr_vertices.length;
	
	for ( var i in res.arr_vertices )
	{
		v( res.arr_vertices[ i ][ 0 ] * factor, res.arr_vertices[ i ][ 1 ] * factor, res.arr_vertices[ i ][ 2 ] * factor );
	}
	

	for( var i in res.arr_polygon_vertices )
	{
		var arr_polygon_vertices = res.arr_polygon_vertices[ i ];
		
		var int_arr_polygon_length = arr_polygon_vertices.length;
		for ( var index_arr_vertex = 0; index_arr_vertex < int_arr_polygon_length - 2; index_arr_vertex++ )
		{
			f3( arr_polygon_vertices[ 0 ], arr_polygon_vertices[ index_arr_vertex + 1 ], arr_polygon_vertices[ index_arr_vertex + 2 ] );

		}
	}
	for( var i in res.arr_polygon_uvs )
	{
		var arr_polygon_uvs = res.arr_polygon_uvs[ i ];
		var arr_polygon_vertices = res.arr_polygon_vertices[ i ];
		
		var int_arr_polygon_length = arr_polygon_uvs.length;
		for ( var index = 0; index < int_arr_polygon_length - 2; index++ )
		{
			var arr_uvs_0 = res.arr_uvs[ arr_polygon_uvs[ 0 ] ];
			var arr_uvs_1 = res.arr_uvs[ arr_polygon_uvs[ index + 1 ] ];
			var arr_uvs_2 = res.arr_uvs[ arr_polygon_uvs[ index + 2 ] ];
			
			/** If there is UV data, read it */
			if ( arr_uvs_0 !== undefined )
			{
				var uvs = [
					new THREE.UV( arr_uvs_0[ 0 ], arr_uvs_0[ 1 ] )
				,	new THREE.UV( arr_uvs_1[ 0 ], arr_uvs_1[ 1 ] )
				,	new THREE.UV( arr_uvs_2[ 0 ], arr_uvs_2[ 1 ] )
				];
			}
			else
			{
				var sq = Math.sqrt( int_count_vertices );
				var mapp = function( vert )
				{
					var u = ( vert / sq ) / sq;
					var v = ( vert % sq ) / sq;
					return { 'u' : u, 'v' : v };
				};
				var v1 = arr_polygon_vertices[ 0 ];
				var v2 = arr_polygon_vertices[ index + 1 ];
				var v3 = arr_polygon_vertices[ index + 2 ];
				var uvs = [
					new THREE.UV( mapp( v1 ).u, mapp( v1 ).v )
				,	new THREE.UV( mapp( v2 ).u, mapp( v2 ).v )
				,	new THREE.UV( mapp( v3 ).u, mapp( v3 ).v )
				];
			}
	
			this.faceVertexUvs[ 0 ].push( uvs );
		}
	}


	this.computeCentroids();
	this.computeFaceNormals();
	//this.sortFacesByMaterial();

	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );

	}

	function f3( a, b, c )
	{
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}

}

Obj_from_str.prototype = new THREE.Geometry();
Obj_from_str.prototype.constructor = Obj_from_str;

/**
CLONE
/**/

var Obj_from_geom = function ( geom )
{
	var factor = 1;
	var scope = this;

	THREE.Geometry.call( this );

	for ( var i in geom.vertices )
	{
		v( geom.vertices[ i ].position.x, geom.vertices[ i ].position.y, geom.vertices[ i ].position.z );
	}
	for ( var i in geom.faces )
	{
		f3( geom.faces[ i ].a, geom.faces[ i ].b, geom.faces[ i ].c  );
	}
	
	for ( var i in geom.faceVertexUvs[ 0 ] )
	{
		uv( geom.faceVertexUvs[ 0 ][ i ][ 0 ], geom.faceVertexUvs[ 0 ][ i ][ 1 ], geom.faceVertexUvs[ 0 ][ i ][ 2 ] )
	}
	
	this.computeCentroids();
	this.computeFaceNormals();
//	this.sortFacesByMaterial();

	function v( x, y, z )
	{
	//	console.log('Adding vertex ' + x + ', ' + y + ', ' + z );
		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x * 1, y * 1, z * 1 ) ) );
	}
	function f3( a, b, c )
	{
	//	console.log('Adding face ' + a + ', ' + b + ', ' + c );
		scope.faces.push( new THREE.Face3( a * 1, b * 1, c * 1 ) );
	}
	function uv( a, b, c )
	{
		scope.faceVertexUvs[ 0 ].push( [
			new THREE.UV( a.u, a.v )
		,	new THREE.UV( b.u, b.v )
		,	new THREE.UV( c.u, c.v )
		] );
	}
}

Obj_from_geom.prototype = new THREE.Geometry();
Obj_from_geom.prototype.constructor = Obj_from_geom;