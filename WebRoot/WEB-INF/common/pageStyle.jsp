<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<style type="text/css">


/* -------------------------------------------- */
/* ------------- Pagination: Clean ------------ */
/* -------------------------------------------- */


/* -------------------------------------------- */
/* ----------- Pagination: Digg Style --------- */
/* -------------------------------------------- */
	
#pagination-digg li          { border:0; margin:0; padding:0; font-size:11px; list-style:none; /* savers */ float:left; }
#pagination-digg a           { border:solid 1px #9aafe5; margin-right:2px; text-align:center; margin-top:3px; width:20px; height:25px; line-height:25px; display:block;}
#pagination-digg .previous-off,
#pagination-digg .next-off   { border:solid 1px #cccccc; color:#888888; display:block; float:left; font-weight:bold; margin-right:2px; margin-top:3px; text-align:center; width:60px; height:25px; line-height:25px; }
#pagination-digg .next a,
#pagination-digg .previous a { font-weight:bold; width:60px; height:25px; text-align:center; line-height:25px; display:block;}	
#pagination-digg .active     { background:#2e6ab1; width:20px; height:27px; text-align:center; line-height:27px; color:#FFFFFF; font-weight:bold; display:block; float:left;  /* savers */ margin-right:2px; margin-top:3px; }
#pagination-digg a:link, 
#pagination-digg a:visited   { color:#0e509e; display:block; float:left; text-align:center; text-decoration:none; }
#pagination-digg a:hover     { border:solid 1px #0e509e; }

/* -------------------------------------------- */
/* ------------- Pagination: Flickr -----------	*/
/* -------------------------------------------- */
	
#pagination-flickr li          { border:0; margin:0; padding:0; font-size:11px; list-style:none; /* savers */ float:left;  }
#pagination-flickr a           { border:solid 1px #9aafe5; text-align:center; margin-right:2px; margin-top:3px; width:20px; height:25px; line-height:25px; display:block; }
#pagination-flickr .previous-off,
#pagination-flickr .next-off   {border:solid 1px #cccccc; color:#888888; display:block; float:left; font-weight:bold; margin-right:2px; text-align:center; margin-top:3px; width:60px; height:25px; line-height:25px; }
#pagination-flickr .next a,
#pagination-flickr .previous a { font-weight:bold; text-align:center; width:60px; height:25px; line-height:25px; display:block; }	
#pagination-flickr .active     {  background:#2e6ab1; width:20px; height:27px; text-align:center; line-height:27px; color:#FFFFFF; font-weight:bold; display:block; float:left;  /* savers */ margin-right:2px; margin-top:3px; }
#pagination-flickr a:link, 
#pagination-flickr a:visited   {color:#0e509e; display:block; float:left; text-align:center;  text-decoration:none;  }
#pagination-flickr a:hover     { border:solid 1px #0e509e; }
.shuzik{width:35px; height:18px; border:#94B5C5 1px solid; font-size:12px; line-height:18px; }
</style>