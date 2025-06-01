import Gallery from '@/components/ui/Gallery/Gallery';
import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <p style={{ color:'white', textAlign: 'center', fontSize: 18, marginBottom: 30 }}>
        Наша компания занимается организацией мероприятий и созданием уникальных впечатлений для клиентов. Мы объединяем профессионализм, креатив и внимание к деталям, чтобы каждая встреча была незабываемой.
      </p>

      <Gallery />
    </div>
  );
}
