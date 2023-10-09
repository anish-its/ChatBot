const router = require('express').Router();

function filterData(data){
    let temp = [{type:'text',data:null},{type:'button',data:null},{type:'end',data:null}];
    data.forEach((item)=>{
      if(item.type === 'speak' || item.type === 'text')
      {
        temp[0].data = item.payload.message;
      }
      if(item.type === 'choice')
      {
        let btemp = [];
        item.payload.buttons.forEach((btn)=>{
          btemp.push([btn.name,btn.request])
        });
        temp[1].data = btemp;
      }
      if(item.type === 'end')
      {
        temp[2].data = 'end of conversation...';
      }
    });
    return({ data :{type:'response',data:temp}});
}

router.post('/',async(req,res)=>{
    //const API_KEY = 'VF.DM.65204c888d2bac00071ce061.JAVPHeiOlWUZc5jt';
    const API_KEY = 'VF.DM.651fedd6ffcc370007a10ea2.yVQtyPFHNF4oqDgw';
    const userID = 'joe';

    let result = await fetch(`https://general-runtime.voiceflow.com/state/user/${userID}/interact`, {
        headers: { 
            'Authorization': API_KEY, 
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        body: JSON.stringify(req.body),
    });
    result = await result.json();
    result = filterData(result);
    res.send(result);
})

module.exports = router;