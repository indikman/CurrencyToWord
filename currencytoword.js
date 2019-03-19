function ConvertToWords(numb){
    var val = "",wholeNo = numb, points = "", andStr = "", pointStr = "";
    var endStr = "Only";
    try
        {
            var decimalPlace = numb.indexOf('.');
            if (decimalPlace > 0)
            {
                wholeNo = numb.substring(0, decimalPlace);
                points = numb.substring(decimalPlace + 1);

                //Check whether the values are 
                if(parseInt(wholeNo)>0 && parseInt(points) > 0){
                    andStr = "and Cents";
                }else if (!parseInt(wholeNo)>0){
                    andStr = "Cents";
                }

                //Zero will show 'only'
                if(parseInt(wholeNo)>0 && parseInt(points) > 0){
                    endStr = "Only";
                }else{
                    endStr = "";
                }



                if (parseInt(points) > 0)
                {
                    //andStr = "and Cents";// just to separate whole numbers from points/cents //Default Value  "and"
                    endStr = " " + endStr;//Cents  //Default Value "Cents " 
                    pointStr = ConvertDecimals(points);
                }
            }
            
            var x1,x2,x3,x4;
            x1=ConvertWholeNumber(wholeNo).trim();
            
            //Prepping up to the final outcome
            val = x1 + " " + andStr + "" + pointStr + " " + endStr;
        }
        catch (err)
        {
            console.log(err);
            return "";
        }
        return val;

}

function ConvertWholeNumber(num)
    {
        var word = "";
        try
        {
            var beginsZero = false;//tests for 0XX
            var isDone = false;//test if already translated
            var dblAmt = parseFloat(num);

            //if ((dblAmt > 0) && number.StartsWith("0"))
            if (dblAmt > 0)
            {//test for zero or digit zero in a nuemric
                beginsZero = num.startsWith("0");

                var numDigits = num.length;
                var pos = 0;//store digit grouping
                var place = "";//digit grouping name:hundres,thousand,etc...
                switch (numDigits)
                {
                    case 1://ones' range

                        word = ones(num);
                        isDone = true;
                        break;
                    case 2://tens' range
                        word = tens(num);
                        isDone = true;
                        break;
                    case 3://hundreds' range
                        pos = parseInt(numDigits % 3) + 1;
                        place = " Hundred ";
                        break;
                    case 4://thousands' range
                    case 5:
                    case 6:
                        pos = parseInt(numDigits % 4) + 1;
                        place = " Thousand ";
                        break;
                    case 7://millions' range
                    case 8:
                    case 9:
                        pos = parseInt(numDigits % 7) + 1;
                        place = " Million ";
                        break;
                    case 10://Billions's range
                    case 11:
                    case 12:
                        pos = parseInt(numDigits % 10) + 1;
                        place = " Billion ";
                        break;
                    case 13://Trillion's range
                    case 14:
                    case 15:
                        pos = parseInt(numDigits % 13) + 1;
                        place = " Trillion ";
                        break;
                    case 16://Quadrillion's range
                    case 17:
                    case 18:
                        pos = parseInt(numDigits % 16) + 1;
                        place = " Quadrillion ";
                        break;
                    //add extra case options for anything above Billion...
                    default:
                        isDone = true;
                        break;
                }
                if (!isDone)
                {//if transalation is not done, continue...(Recursion comes in now!!)
                    if (num.substring(0, pos) != "0" && num.substring(pos) != "0")
                    {
                        try
                        {
                            if(parseInt(num.substring(0, pos))==0){
                                word = ConvertWholeNumber(num.substring(0, pos)) + "" + ConvertWholeNumber(num.substring(pos));
                            }else{
                                word = ConvertWholeNumber(num.substring(0, pos)) + place + ConvertWholeNumber(num.substring(pos));
                            }
                            
                        }
                        catch { }
                    }
                    else
                    {
                        word = ConvertWholeNumber(num.substring(0, pos)) + ConvertWholeNumber(num.substring(pos));
                    }

                    //check for trailing zeros
                    //if (beginsZero) word = " and " + word.trim();
                }
                //ignore digit grouping names
                if (word.trim() === place.trim()) word = "";
            }
        }
        catch (err) { 
            console.log(err);
        }
        return word.trim();
    }

    function tens(num)
    {
        var _Number = parseInt(num);
        var name = null;
        switch (_Number)
        {
            case 0:
                name = "";
                break;
            case 10:
                name = "Ten";
                break;
            case 11:
                name = "Eleven";
                break;
            case 12:
                name = "Twelve";
                break;
            case 13:
                name = "Thirteen";
                break;
            case 14:
                name = "Fourteen";
                break;
            case 15:
                name = "Fifteen";
                break;
            case 16:
                name = "Sixteen";
                break;
            case 17:
                name = "Seventeen";
                break;
            case 18:
                name = "Eighteen";
                break;
            case 19:
                name = "Nineteen";
                break;
            case 20:
                name = "Twenty";
                break;
            case 30:
                name = "Thirty";
                break;
            case 40:
                name = "Fourty";
                break;
            case 50:
                name = "Fifty";
                break;
            case 60:
                name = "Sixty";
                break;
            case 70:
                name = "Seventy";
                break;
            case 80:
                name = "Eighty";
                break;
            case 90:
                name = "Ninety";
                break;
            default:
                if (_Number > 0)
                {
                    name = tens(num.substring(0, 1) + "0") + " " + ones(num.substring(1));
                }
                break;
        }
        return name;
    }

    function ones(num)
    {
        var _Number = parseInt(num);
        var name = "";

        if(_Number==null){
            return "";
        }

        switch (_Number)
        {

            case 1:
                name = "One";
                break;
            case 2:
                name = "Two";
                break;
            case 3:
                name = "Three";
                break;
            case 4:
                name = "Four";
                break;
            case 5:
                name = "Five";
                break;
            case 6:
                name = "Six";
                break;
            case 7:
                name = "Seven";
                break;
            case 8:
                name = "Eight";
                break;
            case 9:
                name = "Nine";
                break;
            default:
                name = "";
                break;
        }
        return name;
    }

    function onesDecimal(num)
    {
        var _Number = parseInt(num);
        var name = "";

        
        switch (_Number)
        {

            case 1:
                name = "Ten";
                break;
            case 2:
                name = "Twenty";
                break;
            case 3:
                name = "Thirty";
                break;
            case 4:
                name = "Fourty";
                break;
            case 5:
                name = "Fify";
                break;
            case 6:
                name = "Sixty";
                break;
            case 7:
                name = "Seventy";
                break;
            case 8:
                name = "Eighty";
                break;
            case 9:
                name = "Ninety";
                break;
            case 0:
                    name = "";
                    break;
        }
        return name;
    }

    function ConvertDecimals(number)
    {
        var word = " ";
        var beginsZero = false;//tests for 0XX
        var isDone = false;//test if already translated
        var dblAmt = (parseFloat(number));

        var numDigits = number.length;
        
        var pos = 0;//store digit grouping
        var place = "";//digit grouping name:hundres,thousand,etc...
        switch (numDigits)
        {
            case 1://ones' range

                word = word + onesDecimal(number);
                isDone = true;
                break;
            case 2://tens' range
                word = word + tens(number);
                isDone = true;
                break;
            default:
                isDone = true;
                break;
        }

        return word;
    }