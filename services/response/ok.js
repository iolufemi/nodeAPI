"use strict";
module.exports = function(data){
	if(data){
		this.status(200).json({status: 'success', data: data});
	}else{
		this.status(200).json({status: 'success'});
	}
};
