import UserPlan from "../Models/UserPlan.js";
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'

export const getAllUser = asyncHandler(async (req , res) => {
    
    const users = await User.find({},{password:0,cpassword:0}).lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

export const getCurrentPlan = asyncHandler(async (req , res) => {
    const { userId } = req.body
    console.log(userId);
    // Confirm data
    if (!userId) {
        return res.status(400).json({ message: 'User ID Required' })
    }
    const today_date = new Date()
    today_date.setDate(today_date.getDate() +3)

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$lte:today_date},
                "end_date":{$gte:today_date},
                // "planID": 
                "userId":userId
            }
        },
        {
        //     $count : "Total plan"
        // }
            $group : {
                "_id": "$_id",
                "userId":{"$first":"$userId"} ,
                "planId":{"$first":"$planId"} ,
                "totalFee" : {$sum : "$planId"}}
        }
    ]
        )

    // db.users.find({
    //     "$expr": { 
    //         "$and": [
    //              { "$eq": [ { "$dayOfMonth": "$dob" }, { "$dayOfMonth": new Date() } ] },
    //              { "$eq": [ { "$month"     : "$dob" }, { "$month"     : new Date() } ] }
    //         ]
    //      }
    //  });

    // If no users 
    console.log(user);

    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)
})


export const addUserPlan = asyncHandler(async (req , res) => {

    // read data from req body
    const {userId , planId , fees} = req.body

    // creating userObject
    const userPlanObject = {userId , planId , fees}

    // Create and store new user 
    const userplan = await new UserPlan(userPlanObject).save()

    if (userplan) { //created 
        res.status(201).json({ message: `New user plan for user ${userId} created of plan ${planId  }` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }

})

export const updateUser = asyncHandler(async (req, res) => {
    const {id , name , email , mobileno,role , password } = req.body
    // Does the user exist to update?
    const user = await User.findById({"_id":id}).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({"_id": id }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.name = name
    user.email = email
    user.mobilemobileno =mobileno
    user.role = role

    if (password) {
        // Hash password 
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password , salt)
        user.password = hashedPassword 
        user.cpassword = hashedPassword 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.email} updated` })
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    // Confirm data
    if (!email) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findOne({email}).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await User.deleteOne({email})

    const reply = `Username ${result.email} deleted`

    res.json({message: reply})
})