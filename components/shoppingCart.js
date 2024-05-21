import React from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ShoppingCart = ({ totalAmount, itemCount }) => {
    return (
        <div className="container my-4">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-6">
                    <h4>Total: Kr. {totalAmount}</h4>
                </div>
                <div className="col-md-6 text-right">
                    <Badge count={itemCount} offset={[10, 0]}>
                        <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                    </Badge>
                </div>
            </div>
            {/* Add your cart products display here */}
        </div>
    );
};

export default ShoppingCart;