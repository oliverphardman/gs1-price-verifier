// Please see https://ref.gs1.org/standards/genspecs/ for more information about the GS1 standard this module is based on.

/*
Calculates the price verifier.
The input price should be a 4 or 5 digit purely numeric string (e.g. "1234" or "12345") depending on your barcode setup.
Values before the first significant digit should be padded with 0s.
For example, in a 4 digit system, $12.34 would be "1234" and $1.23 would be "0123"
In a 5 digit system, $12.34 would be "01234" and $1.23 would be "00123".
*/

 exports = function(price){
    let weightingFactors = {
        "0": 0,
        "1": 9,
        "2": 7,
        "3": 5,
        "4": 3,
        "5": 1,
        "6": 8,
        "7": 6,
        "8": 4,
        "9": 2
    }

    if(price.length == 5){
        // Five-digit price verifier
        let total = 0
  
        // Digit 1
        let s1 = (parseInt(price[0]) * 5)
        if(s1.toString().length > 1){
          s1 = parseInt(s1.toString()[0]) + parseInt(s1.toString()[1])
        }
        total += s1
        
  
        // Digit 2
        let s2 = parseInt(price[1]) * 2
        if(s2 >= 10){
          s2 = parseInt(s2.toString()[1]) - parseInt(s2.toString()[0])
        }
        total += s2
  
        // Digit 3
        let s3 = parseInt(price[2]) * 5
        if(s3.toString().length > 1){
          s3 = s3 - parseInt(s3.toString()[0])
          s3 = parseInt(s3.toString()[s3.toString().length - 1])
        }
        total += s3
  
        // Digit 4
        let s4 = parseInt(price[3]) * 5
        if(s4.toString().length > 1){
          s4 = parseInt(s4.toString()[0]) + parseInt(s4.toString()[1])
          total += s4
        }else{
          total += s4
        }
  
        // Digit 5
        let s5 = (parseInt(price[4]) * 2).toString()
        if(s5.length > 1){
          total += parseInt(s5.toString()[1]) - parseInt(s5.toString()[0])
        }else{
          total += parseInt(s5)
        }
  
        total = (Math.ceil(total / 10) * 10) - total
  
        return weightingFactors[total.toString()]
    } else if (price.length == 4){
        // Four-digit price verifier
        let total = 0
  
        // Digit 1
        let s1 = parseInt(price[0]) * 2
        if(s1 >= 10){
            s1 = parseInt(s1.toString()[1]) - parseInt(s1.toString()[0])
        }
        total += s1
        
  
        // Digit 2
        let s2 = parseInt(price[1]) * 3
        if(s2 >= 10){
          s2 = parseInt(s2.toString()[1])
        }
        total += s2
  
        // Digit 3
        let s3 = parseInt(price[2]) * 5
        if(s3.toString().length > 1){
          s3 = s3 - parseInt(s3.toString()[0])
          s3 = parseInt(s3.toString()[s3.toString().length - 1])
        }
        total += s3
  
        // Digit 4
        let s4 = parseInt(price[3]) * 5
        if(s4.toString().length > 1){
          s4 = s4 - parseInt(s4.toString()[0])
          s4 = parseInt(s4.toString()[s4.toString().length - 1])
        }
        total += s4
  
        total = (total*3).toString()[total.toString().length - 1]
  
        return weightingFactors[total.toString()]
    }else {
        throw new Error("Invalid price length")
    }
}