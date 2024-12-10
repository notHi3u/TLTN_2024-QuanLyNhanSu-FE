import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

interface PlainCardProps {
    headerContent?: string;
    headerActions?: ReactNode;
    bodyContent?: ReactNode;
    className?: string;
    bodyClassName?: string;
    footerContent?: ReactNode;
}

const PlainCard: React.FC<PlainCardProps> = ({
    headerContent,
    headerActions,
    bodyContent,
    className,
    bodyClassName,
    footerContent,
}) => {
    return (
        <Card
            className={`border-2 rounded-xl overflow-hidden drop-shadow-md shadow-md ${className}`}
        >
            {headerContent && <CardHeader className="flex justify-between pr-0 py-3 pb-5">
                <h3 className="font-bold">
                    {headerContent}
                </h3>
                <div>{headerActions}</div>
            </CardHeader>
            }
            <CardBody className={`${bodyClassName}`}>{bodyContent}</CardBody>
            {footerContent}
        </Card>
    );
};

export default PlainCard;
