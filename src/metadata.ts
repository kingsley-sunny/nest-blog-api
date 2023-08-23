/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./database/base/base.model"), { "BaseModel": {} }], [import("./database/models/role/role.model"), { "RoleModel": { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String }, title: { required: true, type: () => String } } }], [import("./database/models/userRole/userRole.model"), { "UserRoleModel": { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String }, user_id: { required: true, type: () => Number }, role_id: { required: true, type: () => Number } } }], [import("./database/models/user/user.model"), { "UserModel": { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String }, full_name: { required: true, type: () => String }, user_name: { required: true, type: () => String }, email: { required: true, type: () => String } } }], [import("./modules/user/dto/create-user.dto"), { "CreateUserDto": { full_name: { required: true, type: () => String }, user_name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8 } } }], [import("./modules/auth/login/dto/login.dto"), { "LoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 5 } } }], [import("./modules/auth/reset-password/dto/create-new-password.dto"), { "CreateNewPasswordDto": { unique_id: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./modules/auth/reset-password/dto/create-reset-password.dto"), { "CreateResetPasswordDto": { email: { required: true, type: () => String } } }], [import("./database/models/resetPasswordCode/resetPasswordCode.model"), { "ResetPasswordCodeModel": { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String }, unique_id: { required: true, type: () => String }, email: { required: true, type: () => String }, expires_at: { required: true, type: () => String }, is_used: { required: true, type: () => Boolean } } }], [import("./modules/auth/veritfication/dto/create-verification.dto"), { "CreateVerificationDto": { email: { required: true, type: () => String } } }], [import("./database/models/verificationCode/verificationCode.model"), { "VerificationCodeModel": { id: { required: true, type: () => Number }, uuid: { required: true, type: () => String }, created_at: { required: true, type: () => String }, updated_at: { required: true, type: () => String }, user_id: { required: true, type: () => Number }, code: { required: true, type: () => Number }, email: { required: true, type: () => String }, expires_at: { required: true, type: () => Object } } }], [import("./modules/user-role/dto/create-user-role.dto"), { "CreateUserRoleDto": { user_id: { required: true, type: () => Number }, role_id: { required: true, type: () => Number } } }]], "controllers": [[import("./app.controller"), { "AppController": { "find": { type: Object } } }], [import("./modules/user/user.controller"), { "UserController": { "create": { type: Object }, "find": { type: Object }, "findById": { type: Object } } }], [import("./modules/auth/login/login.controller"), { "LoginController": { "create": { type: Object } } }], [import("./modules/auth/reset-password/reset-password.controller"), { "ResetPasswordController": { "create": { type: Object }, "createNewPassword": { type: Object }, "find": { type: Object }, "findById": { type: Object } } }], [import("./modules/auth/signup/signup.controller"), { "SignUpController": { "create": { type: Object } } }], [import("./modules/auth/veritfication/veritfication.controller"), { "VerificationController": { "create": { type: Object }, "find": { type: Object }, "findById": { type: Object } } }], [import("./modules/user-role/user-role.controller"), { "UserRoleController": { "create": { type: Object }, "find": { type: Object }, "findById": { type: Object } } }]] } };
};