// num2dia.js 

var diacritics = 
	['',
	 '\u0302', //Tone 1 U+0302 Combining Circumflex Accent
	 '\u0301', //Tone 2 U+0301 Combining Acute Accent 
	 '\u0304', //Tone 3 U+0304 Combining Macron
	 '\u032C', //Tone 4 U+032C Combining Caron Below
	 '\u0317', //Tone 5 U+0317 Combining Acute Accent Below
	 '\u0331'  //Tone 6 U+0331 Combining Macron Below
	];

function triggerConvert() {
  $("#resultDiacritics").val(num2dia($("#inputBox").val()))
}

function num2dia(lshk_num) {
  let lshk_dia = "";
  for (let i = 0; i < lshk_num.length; ++i) {
    if (lshk_num[i] >= '1' && lshk_num[i] <= '6') {
      let tone = lshk_num[i];
      let j = lshk_dia.length - 1;
      while (j >= 0 && isLetter(lshk_dia[j]))  {
        if ((!isVowel(lshk_dia[j-1]) && isVowel(lshk_dia[j])) 
        	|| ( //(j>1?!isVowel(lshk_dia[j-2]):true) && 
        		(j>0?!isVowel(lshk_dia[j-1]):true) && 
        		isSpecialSyllable(lshk_dia.substr((j>0?j:j),2)))) 
        {
          lshk_dia =  lshk_dia.substr(0,j+1) 
          			+ diacritics[tone] 
          			+ lshk_dia.substr(j+1);
          j = -1;
        }
        else {
          --j;
        }
      }
    } else {
      lshk_dia = lshk_dia + lshk_num[i];
    }
  }


  return lshk_dia;
}

function isLetter(strValue) {
  var objRegExp  = /^[a-zA-Z]$/;
  return objRegExp.test(strValue);
}
function isVowel(strValue){
	var objRegExp = /^[aeiou]$/;
	return objRegExp.test(strValue);
}
function isSpecialSyllable(strValue){
	var objRegExp = /(m|ng|M|Ng|NG)$/;
	return objRegExp.test(strValue);
}