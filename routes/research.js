const router = require('express').Router();
let Research = require('../models/research');


router.route('getResearch').get((req,res)=>{
    Research.find()
        .then(research => res.json(research))
        .catch(err=>res.status(400).json('error:' + err ));
});
router.route('/insertResearch').post((req,res)=>{
    const ResearchName = req.body.ResearchName;
    const Abstract = req.body.Abstract;
    const Proponents = req.body.Proponents;
    const Beneficiaries = req.body.Beneficiaries;
    const FundSource = req.body.FundSource;
    const NoOfPatents = req.body.NoOfPatents;
    const NoOfUtilModel = req.body.NoOfUtilModel;
    const Cite = req.body.Cite;
    const Remarks = req.body.Remarks;


    
    const newResearch = new Research({ResearchName,Abstract,Proponents,Beneficiaries,FundSource,NoOfPatents,NoOfUtilModel,Cite,Remarks});
    newResearch.save()
        .then(research => res.json('New Record Added !'))
        .catch(err=> res.status(400).json('err:'+ err));
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
                NoOfProponents,
                Beneficiaries,
                FundSource,
                NoOfPatents,
                NoOfUtilModel,
                Cite,
                Remarks} = req.body;
        const updatedResearch = await Research.findByIdAndUpdate(id,{ResearchName,Abstract,NoOfProponents,Beneficiaries,FundSource,NoOfPatents,NoOfUtilModel,Cite,Remarks},{new:true})
        res.status(200).json(updatedResearch);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document' });
    }
})
module.exports = router;