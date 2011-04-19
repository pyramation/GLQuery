/**
Helper function to get the date
/**/
function time()
{
	return new Date().getTime();
}
function timef()
{
	return new Date().toGMTString();
}

( function($)
{
$.fn.arr_tabs = [];
$.fn.makeTabs = function()
{
	return this.each( function()
	{
		var time = Math.round( ( new Date() ).getTime() );
		with ( { time : time } )
		{
			$.fn.arr_tabs[ time ] = [];
			
			$( this ).addClass( 'd_tabs_wrapper' );
			$( this ).children( 'div' ).addClass( 'd_tab_wrapper' );
			
			var $d_wrapper = $( this );
			
			var $li = $( this ).children( 'ul' ).children( 'li' );
			$li.children( 'a' ).each(
			function()
			{
				$.fn.arr_tabs[ time ].push( $( this ).data( 'time', time ) );
				
				
				$( this )
				.click( function()
				{
					for ( var i in $.fn.arr_tabs[ $( this ).data( 'time' ) ] )
					{
						$.fn.arr_tabs[ $( this ).data( 'time' ) ][ i ].removeClass( 'a_tabs_selected' );
					}
					$( this ).addClass( 'a_tabs_selected' );
					
					$( this ).addClass( 'a_tabs_selected' );
					$( this ).parent().parent().parent().children( 'div' ).hide();
					$( $( this ).attr( 'href' ) ).show();
				} )
				.mouseover( function() { $( this ).addClass( 'a_tabs_hover' ); }  )
				.mouseout( function() { $( this ).removeClass( 'a_tabs_hover' ); } )
				.addClass( 'a_tabs' )
				;
			} )
			.first().click()
			;
			
			$li.children( 'a' ).first().addClass( 'a_tabs_first' );
			$li.children( 'a' ).last().addClass( 'a_tabs_last' );
		}
	} );
}
$.fn.makeDialog = function( obj )
{
	var str_title = '&nbsp;';
	if ( obj !== undefined && obj.title !== undefined )
		str_title = obj.title;
		
	return this.each( function()
	{
/** { */

var $div_bar = $( '<div/>' )
var $div_content = $( '<div/>' )

//$div_content.html( $( this ).html() );
//$( this ).html( '' );

$( this )
	.addClass( 'd_dialog' )
	.prepend( $div_content )
	.prepend( $div_bar )
	;
/*
var $b_minimize = $( '<button>&gt;</button>' ).css( 'float', 'right' )
.click(
function()
{
	$div_content.parent().css( 'width', '10%' )
	.css( 'right', '10px' )
	;
	//$div_content.hide();
} );
var $b_maximize = $( '<button>&lt;</button>' ).css( 'float', 'right' )
.click(
function()
{
	$div_content.parent().css( 'width', '90%' )
	.css( 'right', '10px' )
	;
	//$div_content.show();
} );
*/

$div_bar
	.addClass( 'd_bar' )
	.html( str_title )
	.mouseover( function() { $( this ).parent().draggable().draggable( "option", "disabled", false ); } )
	.mouseout( function() { $( this ).parent().draggable( "option", "disabled", true ); } )

;
/** } */
	} );
};


$.fn.addButtons = function( obj )
{
	return this.each( function()
	{
		var $input = $( this );
		var $btn_inc = $('<button>+</button>').data( 'parent', $input ).data( 'amount', obj.amount );
		var $btn_dec = $('<button>-</button>').data( 'parent', $input ).data( 'amount', -1 * obj.amount );
		$input.after( $btn_inc ).after( $btn_dec );
		
		function fnc()
		{
			$( this ).data( 'parent' )
				.val( ( $( this ).data( 'parent' ).val() * 1 ) + ( $( this ).data( 'amount' ) ) * 1 )
				.keyup()
			;
		}
		
		$btn_inc.click( fnc );
		$btn_dec.click( fnc );
	} );
};

} )( jQuery );

String.format = function()
{
	var str=arguments[0];
	str = str.replace(/`/g,"\"");
	var size = arguments.length;
	for (var i = 0; i<size; i++)
	{
		var replaceThis = "\\{"+i+"\\}";
		var withThis = arguments[i+1];
 
		var re = new RegExp( replaceThis, "g" );
		str = str.replace(re , withThis );
	}
	return str;
};
String.prototype.format = function()
{
	var str = this.replace(/`/g,"\"");
	var size = arguments.length;
	for (var i = 0; i<size; i++)
	{
		var replaceThis = "\\{"+i+"\\}";
		var withThis = arguments[ i ];
 
		var re = new RegExp( replaceThis, "g" );
		str = str.replace(re , withThis );
	}
	return str;
};
Array.implode = function( delimit, array )
{
	return array.join( delimit );
};
String.explode = function( delimit, string )
{
	return string.split( delimit );
};
jQuery.json_decode = function ( string )
{
	return jQuery.parseJSON( string );
};
jQuery.json_encode = function ( array )
{
	return jQuery.JSON.encode( array );
};
String.prototype.startsWith = function( str ) 
{
	return ( this.match( new RegExp( '^' + str ) ) == str );
}
String.prototype.endsWith = function( str ) 
{
	return ( this.match( new RegExp( str + '$' ) ) == str );
}
String.prototype.contains = function( str ) 
{
	return this.indexOf( str ) != -1;
}
var echo = function( obj, extra )
{
	if ( extra !== undefined )
	{
		echo( String.format.apply( null, arguments ) );
		return;
	}
	
	try
	{
		console.log( obj );
	}
	catch( x )
	{
	}
};
Math.round_number = function( num, dec )
{
	return Math.round( num * Math.pow( 10, dec ) ) / Math.pow( 10, dec );
}

jQuery.JSON = 
{
	useHasOwn : ( {}.hasOwnProperty ? true : false ),
	pad : function( n ) 
	{
		return n < 10 ? "0" + n : n;
	},
	m : 
	{
		"\b": '\\b',
		"\t": '\\t',
		"\n": '\\n',
		"\f": '\\f',
		"\r": '\\r',
		'"' : '\\"',
		"\\": '\\\\'
	},
	encodeString : function( s )
	{
		if ( /["\\\x00-\x1f]/.test( s ) ) 
{
return '"' + s.replace( /( [\x00-\x1f\\"] )/g, function( a, b ) 
{
var c = m[b];
if( c )
{
return c;

}
c = b.charCodeAt(  );
return "\\u00" +
Math.floor( c / 16 ).toString( 16 ) +
( c % 16 ).toString( 16 );
} ) + '"';

}
return '"' + s + '"';
},
encodeArray : function( o )
{
var a = ["["], b, i, l = o.length, v;
for ( i = 0; i < l; i += 1 ) 
{
v = o[i];
switch ( typeof v ) 
{
case "undefined":
case "function":
case "unknown":
break;
default:
if ( b ) 
{
a.push( ',' );

}
a.push( v === null ? "null" : this.encode( v ) );
b = true;

}

}
a.push( "]" );
return a.join( "" );
},
encodeDate : function( o )
{
return '"' + o.getFullYear(  ) + "-" +
pad( o.getMonth(  ) + 1 ) + "-" +
pad( o.getDate(  ) ) + "T" +
pad( o.getHours(  ) ) + ":" +
pad( o.getMinutes(  ) ) + ":" +
pad( o.getSeconds(  ) ) + '"';
},
encode : function( o )
{
if( typeof o == "undefined" || o === null )
{
return "null";
}else if( o instanceof Array )
{
return this.encodeArray( o );
}else if( o instanceof Date )
{
return this.encodeDate( o );
}
else if( typeof o == "string" )
{
return this.encodeString( o );
}else if( typeof o == "number" )
{
return isFinite( o ) ? String( o ) : "null";
}else if( typeof o == "boolean" )
{
return String( o );
}else 
{
var self = this;
var a = ["{"], b, i, v;
for ( i in o ) 
{
if( !this.useHasOwn || o.hasOwnProperty( i ) ) 
{
v = o[i];
switch ( typeof v ) 
{
case "undefined":
case "function":
case "unknown":
break;
default:
if( b )
{
a.push( ',' );

}
a.push( self.encode( i ), ":",
v === null ? "null" : self.encode( v ) );
b = true;

}

}

}
a.push( "}" );
return a.join( "" );

}
},
decode : function( json )
{
return eval( "( " + json + ' )' );

}
};
jQuery.fn.extend({
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (document.selection) {
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});