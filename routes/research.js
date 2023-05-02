const router = require('express').Router();
let Research = require('../models/research');

router.route('/getResearch').get((req,res)=>{
    Research.find()
        .then(research => res.json(research))
        .catch(err=>res.status(400).json('error:' + err ));
});
router.route('/insertResearch').post((req,res)=>{
    const researchData = req.body;
    console.log(researchData);
    /*
    const newResearch = new Research({researchData});
    newResearch.save()
        .then(research => res.json('New Record Added !'))
        .catch(err=> res.status(400).json('err:'+ err));*/
       
});
router.delete('/deleteResearch/:id',async(req,res)=>{
    try {
        const research = await Research.findOneAndDelete({_id: req.params.id});
        if(!research){
            return res.status(404).send('Research not Found !');
        }
            return res.status(200).send('Deleted Successfully'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error!');
    }
})
;
router.put('/updateResearch/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const { ResearchName,
                Abstract,
                Proponents,
                Beneficiaries,
                FundSource,
                NoOfPatents,
                NoOfUtilModel,
                Cite,
                Remarks,
                Details,
                } = req.body;
       
        const {published,yearStarted,yearCompleted,acceptanceDate,agency,region} = Details
        const updatedResearch = await Research.findByIdAndUpdate(
            id,
            {ResearchName,
                Abstract,
                Proponents,
                Beneficiaries,
                FundSource,
                NoOfPatents,
                NoOfUtilModel,
                Cite,
                Remarks,
                Details
            },{new:true})
        res.status(200).json(updatedResearch);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document' });
    }
    console.log(req.body);
    
})
module.exports = router;