const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    user = new Schema({
            name: {
                first_name: {
                    type: String,
                    required: [true, 'Please insert your first name'],
                    trim: true,
                },
                last_name: {
                    type: String,
                    required: [true, 'Please insert your last name'],
                    trim: true,
                },
                email: {
                    type: String,
                    required: true,
                    validate: {
                        validator: function(value) {
                            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
                        },
                        message: "Please enter a valid email address"
                    }
                },
                birthday: {
                    type: Date
                },
                password: {
                    type: String,
                    required: true,
                    minlength: 8,
                    maxlength: 32,
                    validate: {
                        validator: function(value) {
                            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
                        },
                        message: "Password failed validation, you must have at least 1 number, uppercase and special character"
                    }
                },
                {
                    timestamps: {
                        createdAt: 'created_at',
                        updatedAt: 'updated_at'
                    }
                }


            });