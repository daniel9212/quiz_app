import type { SVGAttributes } from 'react'

export default function Plus(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path fill="#000" d="M10 1H6v5H1v4h5v5h4v-5h5V6h-5V1Z" />
    </svg>
  );
}