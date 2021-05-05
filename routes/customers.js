const express=require("express")
const router=express.Router()
const {Customer,validateCustomer}=require("../models/customer")
const validate=require("../middleware/validate")


router.get("/",async(req,res)=>{
    const customers=await Customer.find()
    if(!customers) return res.status(404).send("No customers registered")
    res.send(customers)
})

router.post("/",validate(validateCustomer),async(req,res)=>{

    let customer=new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    
    customer=await customer.save()
    res.send(customer)
})

router.put("/:id",validate(validateCustomer),async(req,res)=>{

    let customer=await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!customer) return res.status(404).send("customer with given ID not found")
    res.send(customer)
})

router.delete("/:id",async(req,res)=>{
    let deletedCustomer=await Customer.findByIdAndRemove(req.params.id)
    if(!deletedCustomer) return res.status(404).send("Customer with given Id not found")
    res.send(deletedCustomer)
})

router.get("/:id",async(req,res)=>{
    let customer=await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("customer with given Id not found")
    res.send(customer)
})

module.exports=router
                                                                                                                                                                                                                                        