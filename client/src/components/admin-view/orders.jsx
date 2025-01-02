/* eslint-disable react/jsx-key */

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {


    const [openDetailsDialog, setOpenDitailDialog] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId))
    }


    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    console.log(orderDetails, "orderList");


    useEffect(() => {
        if (orderDetails !== null) setOpenDitailDialog(true)
    }, [orderDetails])




    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    All Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                orderList.map((orderItem) =>
                                    <TableRow>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{orderItem?.orderDate}</TableCell>
                                        <TableCell>
                                            <Badge className={`px-3 py-1 ${
                                                orderItem?.orderStatus === "Confirmed"
                                                ? 'bg-green-500'
                                                : orderItem?.orderStatus === "rejected"
                                                    ? 'bg-red-500'
                                                    : 'bg-black'
                                                }`}
                                            >
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog
                                                open={openDetailsDialog}
                                                onOpenChange={() => {
                                                    setOpenDitailDialog(false);
                                                    dispatch(resetOrderDetails());
                                                }}

                                            >
                                                <Button
                                                    onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                                <AdminOrderDetailsView orderDetails={orderDetails} />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )
                                : null
                        }

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AdminOrdersView;