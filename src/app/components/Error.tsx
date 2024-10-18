// TODO: Add some styling here
interface ErrorProps {
  message: string,
}

export default function Error({ message }: ErrorProps) {
  return (<div>{message}</div>);
}