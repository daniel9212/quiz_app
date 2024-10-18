import Header from '../components/Header';
import Button from '../components/Button';

const CATEGORIES = [
  {
    id: 25,
    name: 'Art',
  },
  {
    id: 20,
    name: 'Mythology',
  },
  {
    id: 21,
    name: 'Sports',
  },
  {
    id: 23,
    name: 'History',
  },
];

export default function Categories() {
  return (
    <section>
      <Header title='Start Quiz!' />
      <div className="grid grid-cols-2 gap-10">
        {CATEGORIES.map(({ id, name }) => (
          <Button
            title={name}
            href={`/quiz/${id}`}
            key={id}
            className="bg-amber-300"
          />
        ))}
      </div>
    </section>
  );
}