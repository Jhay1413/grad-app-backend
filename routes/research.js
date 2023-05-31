const router = require('express').Router();
let Research = require('../models/ResearchModels/research');
const ExcelJS = require('exceljs');

router.route('/getResearch').get((req,res)=>{
    Research.find()
        .then(research => res.json(research))
        .catch(err=>res.status(400).json('error:' + err ));
});
router.route('/insertResearch').post((req,res)=>{
    const researchData = req.body;
    const newResearch = new Research(researchData);
    newResearch.save()
    .then(() => {
        res.json('New Record Added !');
      })
      .catch((err) => res.status(400).json('err:' + err));
       
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
                Adviser,
                FundSource,
                NoOfPatents,
                NoOfUtilModel,
                Cite,
                Remarks,
                Details,
                } = req.body;
        const updatedResearch = await Research.findByIdAndUpdate(
            id,
            {ResearchName,
                Abstract,
                Proponents,
                Beneficiaries,
                Adviser,
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
})
router.get('/filteredData',async (req,res)=>{
    const {startYear,endYear} = req.query;
    try {
        const response = await Research.find({
            'Details.yearCompleted':{
                $gte: parseInt(startYear),
                $lte:parseInt(endYear)
            }
        }).sort({'Details.yearCompleted': 1})
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
   
})
router.post('/downloadData', async(req,res)=>{
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My sheet');

    const data = req.body;
    worksheet.columns =[
        {header: 'Research Title', key:'researchName', width:100},
        {header: 'Year Completed',key:'YearCompleted',width:10}
    ]

    data.forEach(item=>{
        worksheet.addRow({
            researchName : item.ResearchName,
            YearCompleted: item.Details.yearCompleted
        })
    })
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'Report.xlsx',
      );
      await workbook.xlsx.write(res);
      res.end();
})
module.exports = router;