const router = require('express').Router();
const {CategoryModel} = require('../models/ResearchModels/category');

router.route('/getCategory').get((req,res)=>{
    CategoryModel.find()
        .then(category => res.json(category))
        .catch(err=>res.status(400).json('error:' + err));
});
router.post('/insertCategory',async (req,res)=>{
    const {categoryName} = req.body;
    try {
        const existingCategory = await CategoryModel.findOne({categoryName});
        if(existingCategory){
            return res.status(400).json({ error: 'Category already exists' });
        }
        const newCategory = new CategoryModel({categoryName});;
            newCategory.save()
                .then(()=>{
                    res.json('New Category Added ! ');
                })
                .catch((err)=> res.status(400).json('err:' + err));
   
    } catch (error) {
        res.status(500).send('Server Error !')
    } 
})
router.delete('/deleteCategory/:id',async(req,res)=>{
    try {
        const category = await Category.findOneAndDelete({_id: req.params.id});
        if(!category){
            return res.status(404).send('Category Not Found !');
        }
        return res.status(200).send('Deleted Successfully ! ');
    } catch (error) {
        res.status(500).send('Server Error !')
    }
})
router.put('/updateCategory/:id',async(req,res)=>{

    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        res.status(200).json(updateCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document' });
    }
})
module.exports = router;