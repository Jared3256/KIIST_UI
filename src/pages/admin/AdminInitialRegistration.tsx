import {
    BankOutlined,
    IdcardOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    SafetyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Button, Checkbox, Input, message, Progress, Select} from "antd";
import {ShieldUser} from "lucide-react";
import {useState} from "react";


interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    staffId: string;
    securityQuestion: string;
    securityAnswer: string;
    acceptTerms: boolean;
}

function AdminInitialRegistration() {
    const {Option} = Select;


    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        staffId: "",
        securityQuestion: "",
        securityAnswer: "",
        acceptTerms: false,
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [superAdminCount, setSuperAdminCount] = useState(1);


    const securityQuestions = [
        "What was the name of your first pet?",
        "What is your mother's maiden name?",
        "What was the name of your first school?",
        "What is your favorite book?",
        "What city were you born in?",
    ];

    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const handleInputChange = (
        field: keyof FormData,
        value: string | boolean,
    ) => {
        setFormData((prev) => ({...prev, [field]: value}));

        if (field === "password") {
            setPasswordStrength(calculatePasswordStrength(value as string));
        }
    };

    const validateStep1 = (): boolean => {
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.role
        ) {
            message.error("Please fill in all required fields");
            return false;
        }

        if (!formData.email.includes("@kiist.ac.ke")) {
            message.error("Please use your institutional email address");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            message.error("Passwords do not match");
            return false;
        }

        if (passwordStrength < 75) {
            message.error("Password is too weak. Please use a stronger password");
            return false;
        }

        if (formData.role === "superadmin" && superAdminCount >= 2) {
            message.error("Maximum number of Superadmins (2) has been reached");
            return false;
        }

        return true;
    };

    const validateStep2 = (): boolean => {
        if (
           
            !formData.staffId ||
            !formData.securityQuestion ||
            !formData.securityAnswer ||
            !formData.acceptTerms
        ) {
            message.error("Please complete all fields and accept terms");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async () => {
        if (!validateStep2()) return;

        setIsLoading(true);
        console.log(formData)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            message.success("Registration submitted successfully!");
        }, 2000);
    };

    const getPasswordStrengthColor = (): string => {
        if (passwordStrength < 25) return "#ff4d4f";
        if (passwordStrength < 50) return "#faad14";
        if (passwordStrength < 75) return "#1890ff";
        return "#52c41a";
    };

    const getPasswordStrengthText = (): string => {
        if (passwordStrength < 25) return "Weak";
        if (passwordStrength < 50) return "Fair";
        if (passwordStrength < 75) return "Good";
        return "Strong";
    };

    if (isSubmitted) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-check-circle text-3xl text-green-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Registration Submitted!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your registration has been submitted successfully. A Superadmin will
                        review and verify your account within 24-48 hours.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
                        <ul className="text-sm text-blue-700 text-left space-y-1">
                            <li>• Check your email for confirmation</li>
                            <li>• Wait for account verification</li>
                            <li>• You'll receive login credentials once approved</li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Need help? Contact IT Support at{" "}
                        <span className="font-medium">support@kiist.ac.ke</span>
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        className="w-full !rounded-button"
                        onClick={() => (window.location.href = "/auth/login")}
                    >
                        Return to Login
                    </Button>
                </div>
            </div>
        );
    }
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

        {/* Main Content */}
        <div className="flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className={"flex flex-row justify-center items-center flex-wrap gap-2"}>
                        <ShieldUser style={{color: "blue"}} size={45}/>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Admin Registration
                        </h2>
                    </div>
                    <p className="text-gray-600">Create your administrative account</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
              <span
                  className={`text-sm font-medium ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}
              >
                Personal Information
              </span>
                        <span
                            className={`text-sm font-medium ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}
                        >
                Verification Details
              </span>
                    </div>
                    <Progress
                        percent={currentStep === 1 ? 50 : 100}
                        showInfo={false}
                        strokeColor="#1890ff"
                        className="mb-2"
                    />
                    <p className="text-xs text-gray-500 text-center">
                        Step {currentStep} of 2
                    </p>
                </div>

                {/* Superadmin Warning */}
                {formData.role === "superadmin" && superAdminCount >= 2 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                            <span className="text-red-800 font-medium">
                  Maximum Superadmin limit reached (2/2). Please select Admin
                  role instead.
                </span>
                        </div>
                    </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                size="large"
                                prefix={<UserOutlined className="text-gray-400"/>}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) =>
                                    handleInputChange("fullName", e.target.value)
                                }
                                className="!rounded-button"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Institutional Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                size="large"
                                prefix={<MailOutlined className="text-gray-400"/>}
                                placeholder="your.name@kiist.ac.ke"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="!rounded-button"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Must use your institutional email address
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <Input
                                size="large"
                                prefix={<PhoneOutlined className="text-gray-400"/>}
                                placeholder="+254 700 000 000"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    handleInputChange("phoneNumber", e.target.value)
                                }
                                className="!rounded-button"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="text-gray-400"/>}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange("password", e.target.value)
                                }
                                className="!rounded-button"
                            />
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        Password Strength:
                      </span>
                                        <span
                                            className={`text-xs font-medium`}
                                            style={{color: getPasswordStrengthColor()}}
                                        >
                        {getPasswordStrengthText()}
                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${passwordStrength}%`,
                                                backgroundColor: getPasswordStrengthColor(),
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="text-gray-400"/>}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange("confirmPassword", e.target.value)
                                }
                                className="!rounded-button"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <Select
                                size="large"
                                placeholder="Select your role"
                                value={formData.role}
                                onChange={(value) => handleInputChange("role", value)}
                                className="w-full"
                                suffixIcon={
                                    <i className="fas fa-chevron-down text-gray-400"></i>
                                }
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="superadmin" disabled={superAdminCount >= 2}>
                                    Superadmin{" "}
                                    {superAdminCount >= 2
                                        ? "(Limit Reached)"
                                        : `(${superAdminCount}/2)`}
                                </Option>
                            </Select>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            onClick={handleNext}
                            className="w-full !rounded-button whitespace-nowrap"
                        >
                            Next Step
                        </Button>
                    </div>
                )}

                {/* Step 2: Verification Details */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        {/*<div>*/}
                        {/*    <label className="block text-sm font-medium text-gray-700 mb-2">*/}
                        {/*        Department/Faculty <span className="text-red-500">*</span>*/}
                        {/*    </label>*/}
                        {/*    <Select*/}
                        {/*        size="large"*/}
                        {/*        placeholder="Select your department"*/}
                        {/*        value={formData.department}*/}
                        {/*        onChange={(value) => handleInputChange("department", value)}*/}
                        {/*        className="w-full"*/}
                        {/*        suffixIcon={*/}
                        {/*            <i className="fas fa-chevron-down text-gray-400"></i>*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*        {departments.map((dept) => (*/}
                        {/*            <Option key={dept} value={dept}>*/}
                        {/*                {dept}*/}
                        {/*            </Option>*/}
                        {/*        ))}*/}
                        {/*    </Select>*/}
                        {/*</div>*/}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Staff ID Number <span className="text-red-500">*</span>
                            </label>
                            <Input
                                size="large"
                                prefix={<IdcardOutlined className="text-gray-400"/>}
                                placeholder="Enter your staff ID"
                                value={formData.staffId}
                                onChange={(e) => handleInputChange("staffId", e.target.value)}
                                className="!rounded-button"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Security Question <span className="text-red-500">*</span>
                            </label>
                            <Select
                                size="large"
                                placeholder="Choose a security question"
                                value={formData.securityQuestion}
                                onChange={(value) =>
                                    handleInputChange("securityQuestion", value)
                                }
                                className="w-full"
                                suffixIcon={
                                    <i className="fas fa-chevron-down text-gray-400"></i>
                                }
                            >
                                {securityQuestions.map((question) => (
                                    <Option key={question} value={question}>
                                        {question}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Security Answer <span className="text-red-500">*</span>
                            </label>
                            <Input
                                size="large"
                                prefix={<SafetyOutlined className="text-gray-400"/>}
                                placeholder="Enter your answer"
                                value={formData.securityAnswer}
                                onChange={(e) =>
                                    handleInputChange("securityAnswer", e.target.value)
                                }
                                className="!rounded-button"
                            />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <Checkbox
                                checked={formData.acceptTerms}
                                onChange={(e) =>
                                    handleInputChange("acceptTerms", e.target.checked)
                                }
                                className="mb-2"
                            >
                  <span className="text-sm">
                    I agree to the{" "}
                      <span className="text-blue-600 cursor-pointer hover:underline">
                      Terms and Conditions
                    </span>{" "}
                      and{" "}
                      <span className="text-blue-600 cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                  </span>
                            </Checkbox>
                            <p className="text-xs text-gray-600 ml-6">
                                By registering, you acknowledge that your account will require
                                Superadmin approval before activation.
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                size="large"
                                onClick={handleBack}
                                className="flex-1 !rounded-button whitespace-nowrap"
                            >
                                Back
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleSubmit}
                                loading={isLoading}
                                className="flex-1 !rounded-button whitespace-nowrap"
                            >
                                Complete Registration
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-gray-500 text-sm">
            <p>
                &copy; 2025 Kisii Impact Institute of Science and Technology. All
                rights reserved.
            </p>
            <p>
                Need assistance? Contact IT Support:{" "}
                <a href={"mailto:support@kiist.ac.ke"}> <span className="text-blue-600">support@kiist.ac.ke</span></a> |
                +254 780 640 762
            </p>
        </div>
    </div>
}

export default AdminInitialRegistration