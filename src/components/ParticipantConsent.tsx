import type { RootState } from '@/lib/types';
import { setConsentFormOpen, setConsentGiven } from '@/store/pageStore';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function ParticipantConsent() {
  const { consentFormOpen, consentGiven } = useSelector(
    (state: RootState) => state.page,
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setConsentFormOpen(false));
  const handleToggle = (value: boolean) => dispatch(setConsentFormOpen(value));
  const handleCheck = (value: boolean) => dispatch(setConsentGiven(value));
  return (
    <Dialog
      open={consentFormOpen}
      onOpenChange={handleToggle}>
      <div className='flex items-center gap-4'>
        <Checkbox
          disabled
          checked={consentGiven}
        />
        <p>
          I have read and fully understand the{' '}
          <DialogTrigger asChild>
            <span className='button  underline font-medium'>consent form</span>
          </DialogTrigger>{' '}
          *
        </p>
      </div>
      <DialogContent className='h-3/4 '>
        <DialogHeader>
          <DialogTitle className='geist-title'>
            Participant Information Sheet
          </DialogTitle>
          <DialogDescription>
            Informamation and conset form for the participant
          </DialogDescription>
        </DialogHeader>
        <ParticipantConsentContent />
        <div className='flex items-start gap-2 text-sm geist-normal'>
          <Checkbox
            className='mt-1'
            checked={consentGiven}
            onCheckedChange={handleCheck}
          />
          <span>
            I have read and I consent to providing my personal information and
            responses to the question therein.
          </span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ParticipantConsentContent() {
  return (
    <div className='geist-normal participant-consent overflow-auto bg-gray-50 p-2 rounded'>
      <p>
        This informed consent form is for stakeholders and humanitarian
        professionals that are involved in disaster management interventions in
        Malawi.
      </p>
      <ul className='pl-4'>
        <li>Chikondi Ngaiyaye</li>
        <li>Independent</li>
        <li>Researcher Self-Sponsored.</li>
      </ul>
      <p>This Informed Consent Form has two parts:</p>
      <ol className='list-disc pl-4'>
        <li>
          Information Sheet (to share information about the study with you)
        </li>
        <li>
          Certificate of Consent (for signatures if you choose to participate)
          You will be given a copy of the full Informed Consent Form
        </li>
      </ol>
      <h6>Part I: Information Sheet</h6>
      <h6>Introduction</h6>
      <p>
        I am Chikondi Ngaiyaye and an independent researcher. I am researching
        disaster evacuation sites in rural areas of Malawi. I am going to give
        you some information and invite you to be a part of this research. You
        do not have to decide today whether you will participate in the
        research. Before you decide, you can talk to anyone you feel comfortable
        with about the research.
      </p>
      <p>
        This consent form may contain words that you do not understand. Please
        ask me to stop as we go through the information, and I will take time to
        explain. If you have questions later, you can ask them of me or of
        another researcher.
      </p>
      <h6>Purpose of the research</h6>
      <p>
        Climate change induced disasters are an annual occurrence in Malawi.
        They can also have adverse effects, including flooding that displaces
        people from their homes. However, there are limited dedicated sites that
        people can evacuate to. Therefore, we would like to find which factors
        are important when considering places that would be suitable to
        establish shelter facilities for displaced individuals.
      </p>
      <h6>Type of Research Intervention</h6>
      This research will involve your participation in an online questionnaire
      that would take less than half an hour to complete.
      <h6>Participant Selection</h6>
      You are invited to participate in this research because of your expertise
      in the humanitarian sector, which can contribute to understanding the rank
      of factors that would be considered when determining a suitable place for
      evacuation.
      <h6>Voluntary Participation</h6>
      The choice that you make will have no bearing on your job or any
      work-related evaluations or reports. You may change your mind later and
      stop participating even if you agreed earlier
      <h6>Procedures</h6>
      We are asking you to help us determine the most essential criteria in
      determining suitable areas in evacuation facilities. We are inviting you
      to take part in this research project. If you accept, to rank a set of
      criteria. B. Explain the type of questions that the participants are
      likely to be asked in the focus group, the interviews, or the survey. If
      the research involves questions or discussion which may be sensitive or
      potentially cause embarrassment, inform the participant of this.
      <h6>Duration</h6>
      The research takes place over 6 months. During that time, we request you
      to undertake an online questionnaire consisting of one question.
      <h6>Uses of information</h6>
      The information we shall get from you will be used to determine suitable
      areas for established evacuation facilities and infrastructure. As such,
      it would support your organization by providing data for planning,
      implementation, and monitoring and evaluation.
      <h6>Risks</h6>
      There are no risks to you in providing information in this research.
      <h6>Benefits</h6>
      There will be information that would support the humanitarian community to
      plan for accessible shelter sites for flood victims, enhance humanitarian
      anticipatory action planning and deliver emergency relief.
      <h6>Reimbursements</h6>
      You will not be provided with any incentive to take part in the research.
      <h6>Confidentiality</h6>
      The research being done in the community may draw attention and if you
      participate you may be asked questions by other people in the community.
      We will not be sharing information about you to anyone outside of the
      research team. The information that we collect from this research project
      will be kept private. Any information about you will have a number on it
      instead of your name. Only the researchers will know what your number is
      and we will lock that information up with a lock and key. It will not be
      shared with or given to anyone except name who will have access to the
      information, such as research sponsors, DSMB board, your clinician.
      <h6>Sharing the Results</h6>
      Nothing that you tell us today will be shared with anybody outside the
      research team, and nothing will be attributed to you by name. The
      knowledge that we get from this research will be shared with you and your
      community before it is made widely available to the public. Each
      participant will receive a summary of the results. There will also be
      small meetings in the community and these will be announced. Following the
      meetings, we will publish the results so that other interested people may
      learn from the research.
      <h6>Right to Refuse or Withdraw</h6>
      You do not have to take part in this research if you do not wish to do so,
      and choosing to participate will not affect your job or job-related
      evaluations in any way. You may stop participating in the questionnaire at
      any time that you wish without your job being affected. I will allow you
      at the end of the interview/discussion to review your remarks, and you can
      ask to modify or remove portions of those, if you do not agree with my
      notes or if I did not understand you correctly.
      <h6>Who to Contact</h6>
      If you have any questions, you can ask them now or later. If you wish to
      ask questions later, you may contact any of the following.
      <p>
        This proposal or protocol has been reviewed and approved by Natural and
        Applied Sciences, Research Ethics Committee (NASREC) which is a
        committee whose task it is to make sure that research participants are
        protected from harm. If you wishto find about more about the IRB,
        contact:
      </p>
      <ul className='pl-4 text-left'>
        <li>Chairperson,</li>
        <li>Natural and applied Sciences, Research Ethics Committee</li>
        <li>University of Zambia</li>
        <li>P O Box 32379</li>
        <li>LUSAKA</li>
      </ul>
      OR
      <ul className='pl-4 text-left'>
        <li>
          Directorate of Research and Graduate Studies University of Zambia
        </li>
        <li>P O Box 32379</li>
        <li>LUSAKA</li>
      </ul>
      <p>
        Approval to conduct this research has been provided by the University of
        Zambia, in accordance with its ethics review and approval procedures.
        Any person considering participation in this research project, or
        agreeing to participate, may raise any questions or issues with the
        researchers at any time.
      </p>
      <p>
        In addition, if you are/ or any person is not satisfied with the
        response of researchers may raise ethics issues or concerns, and may
        make any complaints about this research project by contacting the NASREC
        on the address sated above.
      </p>
      <p>
        All research participants are entitled to retain a copy of any
        Participant Information Form and/or Participant Consent Form relating to
        this research project."
      </p>
      <h6>Part II: Certificate of Informed Consent</h6>I have been invited to
      participate in research about evacuation sites in rural areas in Malawi. I
      have read the foregoing information, or it has been read to me. I have had
      the opportunity to ask questions about it and any questions I have been
      asked have been answered to my satisfaction.
    </div>
  );
}
