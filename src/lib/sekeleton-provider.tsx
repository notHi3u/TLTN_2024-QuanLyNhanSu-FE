// // skeleton-table.tsx
// // Skeleton loading when waiting for real data
// import { Avatar, List, Skeleton, SkeletonProps, Table } from 'antd';
// import { ColumnsType, ColumnType } from 'antd/lib/table';

// export type SkeletonTableColumnsType = {
//   key: string;
// };

// type SkeletonTableColumnType = ColumnType<SkeletonTableColumnsType> & {
//   avatar?: boolean;
// };

// type SkeletonTableProps = SkeletonProps & {
//   columns: ColumnsType<SkeletonTableColumnsType>;
//   rowCount?: number;
//   avatar?: boolean;
//   columnPosition?: number[];
// };

// export default function SkeletonTable({
//   loading = false,
//   active = false,
//   rowCount = 5,
//   columns,
//   children,
//   className,
//   columnPosition = [],
// }: SkeletonTableProps): JSX.Element {
//   return loading ? (
//     <Table
//       rowKey="key"
//       pagination={false}
//       dataSource={[...Array(rowCount)].map((_, index) => ({
//         key: `key${index}`,
//       }))}
//       columns={columns.map((column, index) => {
//         const columnWithAvatar = column as SkeletonTableColumnType;
//         return {
//           ...columnWithAvatar,
//           render: function renderPlaceholder() {
//             return (
//               <Skeleton
//                 key={columnWithAvatar.key}
//                 title
//                 active={active}
//                 paragraph={false}
//                 className={className}
//                 avatar={columnPosition.includes(index)}
              
//             >
//             </Skeleton>
//             );
//           },
//         };
//       })}
//     />
//   ) : (
//     <>{children}</>
//   );
// }