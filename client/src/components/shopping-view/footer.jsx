import { PRIVACY_POLICY, REFUND_POLICY, SHIPPING_POLICY, TERMS_CONDITIONS } from "@/constants";


import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";




function ShoppingFooter() {
    return (
        
        <footer className="bg-background px-4 md:px-16 lg:px-28">
            <Separator/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                <div>
                    <h2 className="text-lg font-bold mb-4">
                        About Us
                    </h2>
                    <p>
                        ArtWorld is a Platform where one can buy 3d printed materials and laser engraved items at low cost but in best quality.
                    </p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                    <ul>
                        <li>
                            <Dialog>
                                <DialogTrigger>
                                    Terms & Conditions
                                </DialogTrigger>
                                <DialogHeader>
                                    <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-auto">
                                        {TERMS_CONDITIONS}
                                    </DialogContent>
                                </DialogHeader>

                            </Dialog>
                        </li>
                        <li>
                            <Dialog>
                                <DialogTrigger>
                                    Privacy Policy
                                </DialogTrigger>
                                <DialogHeader>
                                    <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-auto">
                                        {PRIVACY_POLICY}
                                    </DialogContent>
                                </DialogHeader>

                            </Dialog>
                        </li>
                        <li>
                            <Dialog>
                                <DialogTrigger>
                                    Refund Policy
                                </DialogTrigger>
                                <DialogHeader>
                                    <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-auto">
                                        {REFUND_POLICY}
                                    </DialogContent>
                                </DialogHeader>

                            </Dialog>
                        </li>
                        <li>
                            <Dialog>
                                <DialogTrigger>
                                    Shipping Policy
                                </DialogTrigger>
                                <DialogHeader>
                                    <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-auto">
                                        {SHIPPING_POLICY}
                                    </DialogContent>
                                </DialogHeader>

                            </Dialog>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">Contact Us</h2>
                    <ul>
                        <li>PH : +91 7202976357</li>
                        <li>Email : artworld2568@gmail.com</li>
                        <li>Address : 113, Amardhara soc. kundal, kadi, mehsana, gujarat, India, 382715.</li>
                    </ul>
                </div>
            </div>
            <div className="border-t p-4 text-center">
                <p> © 2024 artworld. All Right Reserved</p>
            </div>
        </footer>
    );
};

export default ShoppingFooter;

