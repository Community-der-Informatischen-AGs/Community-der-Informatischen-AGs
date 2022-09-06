interface OptionalProps {
  condition: boolean
  children: any
}

export const Optional = (p: OptionalProps) => {
  if (p.condition) return p.children
  return null
}
