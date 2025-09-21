import Section from '@/components/Section'
import CopyEmail from '../components/CopyEmail'

const Contact = () => {
  return (
    <Section>
      <div className="flex gap-1 items-end">
        <h2 className="topic-text">Contact</h2>
        <p>would be pleased for any new opportunities</p>
      </div>
      <p>Please contact me via</p>
      <div className="flex gap-2">
        <p>Email: {<CopyEmail />}</p>
      </div>
    </Section>
  )
}
export default Contact
