import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";
import styles from './homeLayout.module.css'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles['layout-container']}>
      <Header />
      <div className={styles['content']}>
        {children}
      </div>
      <div className={styles['footer-container']}>
        <Footer />
      </div>
    </div>
  );
}