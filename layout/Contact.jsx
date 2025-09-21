import Section from '@/components/Section'
import CopyEmail from '../components/CopyEmail'
import MessageIcon from '../components/icons/MessageIcon'

const Contact = () => {
  return (
    <Section>
      <div className="flex gap-1 items-end">
        <h2 className="topic-text">
          Contact{' '}
          <span className="text-xl font-light">
            would be pleased for any new opportunities, Thank you in advance.
          </span>
        </h2>
      </div>
      <div className="text-2xl liquid-glass max-w-156 p-4">
        <p className="mb-2">Please contact me via:</p>
        <div className="relative group flex flex-col gap-2">
          <p>
            <b>Email: </b>
            {<CopyEmail />}
          </p>
          <p>
            <b>Tel:</b> 095-528-4138
          </p>
          <MessageIcon />
        </div>
      </div>
    </Section>
  )
}
export default Contact
