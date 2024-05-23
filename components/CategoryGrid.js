import { useRouter } from 'next/router';
import { Card, Row, Col } from 'antd';
import styles from '../styles/CategoryGrid.module.css'; // Custom CSS module

function CategoryGrid({ categories }) {
    const router = useRouter();

    const clickCategory = (e) => {
        const url = {
            pathname: 'shop',
            query: { ...router.query, category: e.currentTarget.id },
        };

        router.push(url);
    };

    return (
        <Row gutter={[16, 16]} className={styles.gridContainer}>
            {categories.map((category) => (
                <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                    <Card
                        id={category.id}
                        onClick={clickCategory}
                        hoverable
                        className={styles.card}
                    >
                        <h4 id={category.id} className={styles.cardTitle}>{category.name}</h4>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default CategoryGrid;
