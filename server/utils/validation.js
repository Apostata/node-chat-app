var isRealString = (str)=>{
	return typeof str ==='string' && str.trim().length > 0;//se é string e se depois do trim espaços em branco o tamanho é maior do que 0;
};

module.exports = {isRealString};